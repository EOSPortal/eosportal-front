import config from "../config";

export const baseUrl = `http://${config.domain}`;
export const chainUrl = (chainName: string) =>
  `http://${chainName}.${config.domain}/api`;

export const fetchJson = (url: string) =>
  fetch(url).then(responds => responds.json());
