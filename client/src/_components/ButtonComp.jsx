import { Button } from "@/components/ui/button";

export function ButtonDemo({ text, handler, variant = "primary", size = "default", className = "" }) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <Button 
      onClick={handler}
      className={`${variants[variant]} ${sizes[size]} font-medium rounded-lg 
                 transition-all duration-200 transform hover:-translate-y-0.5 ${className}`}
    >
      {text}
    </Button>
  );
}
