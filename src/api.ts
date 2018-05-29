import {
  baseUrl,
  fetchJson,
  postJson
} from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/chains`).catch(() => []);
export const getChain = (chain_id:string) => fetchJson(`${baseUrl}/chains/${chain_id}`).catch(() => null);
export const addChain = (url:string) => postJson(`${baseUrl}/chain`, {url});

