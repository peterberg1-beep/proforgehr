const ORG_SESSION_KEY = 'selectedOrganization';

export const setOrgSession = (orgId: string, orgName: string) => {
  localStorage.setItem(ORG_SESSION_KEY, JSON.stringify({ id: orgId, name: orgName }));
};

export const getOrgSession = () => {
  const data = localStorage.getItem(ORG_SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearOrgSession = () => {
  localStorage.removeItem(ORG_SESSION_KEY);
};

export const isInOrgMode = () => {
  return getOrgSession() !== null;
};
