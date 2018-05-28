import {
  baseUrl,
  fetchJson,
  postChain
} from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/chains`).then((res:any) => res.data).catch(() => []);
export const getChain = (chain_id:string) => fetchJson(`${baseUrl}/chain/${chain_id}`).then((res:any) => res.data).catch(() => null);
export const addChain = (url:string) => postChain(`${baseUrl}/chain`, url);
