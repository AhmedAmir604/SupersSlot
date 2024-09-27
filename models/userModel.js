import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
      minLength: [8, "Min length should be 10"],
      maxLength: [40, "Length cannot exceed 40 Charecters"],
    },
    email: {
      type: String,
      required: [true, "Please email is a must!"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (val) => {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
        },
        message: "Please enter a valid email",
      },
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user", "service-provider", "owner"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minLength: [8, "Minimum of 8 charecters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password does not match!",
      },
    },
    passwordChangeTime: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    likedServices: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // isModified method run validators so that we dont get into trouble of defining this.confirmPassword undefined
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeTime = Date.now() - 1000;
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangeToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  //added 10 min expiry for reset Token
  this.passwordResetTokenExpiry = new Date() + 600000;
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return resetToken;
};

//This method is used to Check if password was changed after the token was issued
//It returns true if the password was changed ez
userSchema.methods.isPasswordChanged = function (tokenTime) {
  if (this.passwordChangeTime) {
    const passwordChangedTimeInSec = parseInt(
      this.passwordChangeTime.getTime() / 1000,
      10
    );
    return passwordChangedTimeInSec > tokenTime;
  }
  return false;
};

// userSchema.methods.checkTokenExpiration = async function () {
//   if (this.passwordResetTokenExpiry < new Date()) {
//     return false;
//   }
//   return true;
// };

//this is coruse implemntation for resetpassword
userSchema.methods.resetPassword = async function (newPassword) {
  this.password = newPassword;
  this.passwordConfirm = newPassword;
  this.passwordResetToken = undefined;
  this.passwordResetTokenExpiry = undefined;
  await this.save();
  return true;
};

//for update the password
userSchema.methods.updatePassword = async function (
  newPassword,
  confirmNewPassword
) {
  this.password = newPassword;
  this.passwordConfirm = confirmNewPassword;
  return await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
