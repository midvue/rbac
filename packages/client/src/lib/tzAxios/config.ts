
let windowOrigin: string = window.location.origin;
if (!windowOrigin) {
  windowOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
}

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string || windowOrigin + "/api/";

const domain = JSON.parse(import.meta.env.VITE_APP_DOMAIN as string);

interface Md5Conf {
  md5key: string;
  signKey: string;
}
const md5Conf: Md5Conf = {
  md5key: "TJTXOswvftDc7zNc",
  signKey: "sign",
};

const defaultParams = () => {
  return null;
};
const defaultHeaders = () => {
  return { "Content-Type": "application/json;charset=UTF-8" };
};

export default {
  baseUrl,
  md5Conf,
  domain,
  defaultParams,
  defaultHeaders,
};
