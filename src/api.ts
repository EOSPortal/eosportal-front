import { chainUrl, baseUrl, fetchJson } from "./utils/api.util";

export const getChains = () => fetchJson(`${baseUrl}/api/chains`);

export const getInfos = (chainName: string) =>
fetchJson(chainUrl(chainName) + "/infos");

export const getAllProducers = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "producers");

export const getProducer = (chainName: string, id: string) =>
  fetchJson(chainUrl(chainName) + "producers/" + id);

export const getProducerBlocks = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/producers/${id}/blocks`);

export const getAllBlocks = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "/blocks");

export const getBlock = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/blocks/${id}`);
