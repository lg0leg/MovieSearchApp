const proxyServerUrl = process.env.REACT_APP_SERVER_URL;

export const getDataFromApi = async (query) => {
  const proxyServer = await fetch(`${proxyServerUrl}?q=${query}`);
  const resp = await proxyServer.json();
  return resp.data;
};
