const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "prod":
      url = "https://eventflow.onrender.com";
      break;
    case "dev":
    default:
      url = "http://localhost:9000";
  }
  return url;
};
export default getBaseUrl;
