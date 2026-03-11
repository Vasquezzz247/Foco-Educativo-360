export const useEnvironment = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  const enableTestPages = import.meta.env.VITE_ENABLE_TEST_PAGES === 'true';
  
  return {
    isDevelopment,
    isProduction,
    enableTestPages,
    environment: import.meta.env.MODE
  };
};