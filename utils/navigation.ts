// Utility function to handle navigation with base path
export const getBasePath = () => {
  return import.meta.env.PROD ? '/PorterPlays' : '';
};

export const createPath = (path: string) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};

export const navigateTo = (path: string) => {
  const fullPath = createPath(path);
  window.history.pushState({}, '', fullPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
};