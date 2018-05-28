import {
  baseUrl,
  fetchJson,
  postJson
} from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/chains`);
export const getChain = (chain_id:string) => fetchJson(`${baseUrl}/chain/${chain_id}`);
export const addChain = (url:string) => postJson(`${baseUrl}/chain`, {url});

