let url;
if (import.meta.env.VITE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "https://supersslot.onrender.com";
}
export { url };
