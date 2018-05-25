import {
  baseUrl,
  fetchJson,
  postJson
} from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/chains`).then(res => res.data).then([]);
export const getChain = (chain_id:string) => fetchJson(`${baseUrl}/chain/${chain_id}`).then(res => res.data).then(null);
export const addChain = (url:string) => postJson(`${baseUrl}/chain`, {url});

