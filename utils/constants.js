export const isProduction = import.meta.env.VITE_DEPLOYMENT === "PRODUCTION";
export const API_BASE_URL =
  isProduction
  ? "https://mern-auth-2joi.onrender.com"
  : "";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2 && parts) return parts.pop()?.split(";").shift();
  else return null;
};
