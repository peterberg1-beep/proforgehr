/**
 * Org session utilities — manages the selectedOrganizationId in both
 * localStorage (for client-side reads) and as a cookie (for server reads).
 *
 * Uses SameSite=None; Secure on HTTPS so the cookie is sent in the Manus
 * preview environment and any cross-origin deployment.
 */

function buildCookieString(orgId: string): string {
  const isSecure = window.location.protocol === "https:";
  const maxAge = 30 * 24 * 60 * 60; // 30 days
  let cookie = `selectedOrganizationId=${encodeURIComponent(orgId)}; path=/; max-age=${maxAge}`;
  if (isSecure) {
    cookie += "; SameSite=None; Secure";
  } else {
    cookie += "; SameSite=Lax";
  }
  return cookie;
}

/** Set the active organization ID in localStorage + cookie */
export function setOrgSession(orgId: string): void {
  localStorage.setItem("selectedOrganizationId", orgId);
  sessionStorage.setItem("selectedOrganizationId", orgId);
  document.cookie = buildCookieString(orgId);
}

/** Clear the active organization session */
export function clearOrgSession(): void {
  localStorage.removeItem("selectedOrganizationId");
  sessionStorage.removeItem("selectedOrganizationId");
  // Expire the cookie
  const isSecure = window.location.protocol === "https:";
  let cookie = "selectedOrganizationId=; path=/; max-age=0";
  if (isSecure) {
    cookie += "; SameSite=None; Secure";
  } else {
    cookie += "; SameSite=Lax";
  }
  document.cookie = cookie;
}

/** Get the active organization ID (from localStorage) */
export function getOrgSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("selectedOrganizationId");
}
