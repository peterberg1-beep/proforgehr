// Simple constants for current deployment
export const APP_TITLE = "ProForgeHR";

// Logo placeholders (we can replace with real images later)
export const APP_LOGO = "https://via.placeholder.com/180x50/006AA7/FFFFFF?text=ProForgeHR";
export const APP_LOGO_HERO = "https://via.placeholder.com/600x350/006AA7/FFFFFF?text=ProForgeHR+Hero";
export const APP_LOGO_HORIZONTAL = APP_LOGO;
export const APP_LOGO_DARK = APP_LOGO;
export const APP_LOGO_VERTICAL = APP_LOGO;
export const APP_LOGO_FULL = APP_LOGO;

// Brand colours
export const BRAND = {
  blue: "#006AA7",
  green: "#007A4D",
  gold: "#FFB81C",
  navy: "#0F172A",
  gray: "#6B7280",
  bg: "#F8FAFC",
} as const;

export const getLoginUrl = () => "/login";
