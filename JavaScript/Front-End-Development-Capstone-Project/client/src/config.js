const { protocol, hostname, port } = window.location;

const envApiUrl = import.meta.env.VITE_API_URL?.trim();

const getApiUrl = () => {
  if (envApiUrl) {
    return envApiUrl.replace(/\/+$/, "");
  }

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return `${protocol}//${hostname}:8181`;
  }

  if (port === "4173" || port === "5173") {
    return `${protocol}//${hostname}:8181`;
  }

  if (hostname.includes("-4173.")) {
    return `${protocol}//${hostname.replace("-4173.", "-8181.")}`;
  }

  if (hostname.includes("-5173.")) {
    return `${protocol}//${hostname.replace("-5173.", "-8181.")}`;
  }

  return `${protocol}//${hostname}:8181`;
};

export const API_URL = getApiUrl();
