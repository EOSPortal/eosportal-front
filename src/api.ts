import {
  baseUrl,
  fetchJson,
  postChain
} from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/chains`).catch(() => []);
export const getChain = (chain_id:string) => fetchJson(`${baseUrl}/chains/${chain_id}`).catch(() => null);
export const addChain = (chainURL:string) => postChain(`${baseUrl}/chain`, chainURL);

