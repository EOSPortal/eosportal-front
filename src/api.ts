import {
  chainUrl,
  baseUrl,
  fetchJson,
  getDataForAllPages
} from "./utils/api.util";
import { concat } from "ramda";

export const getChains = () => getDataForAllPages(`${baseUrl}/api/chains`);

export const getInfos = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "/infos");

export const getAllProducers = async (chainName: string) =>
  getDataForAllPages(chainUrl(chainName) + "/producers");

export const getProducer = (chainName: string, id: string) =>
  fetchJson(chainUrl(chainName) + "/producers/" + id);

export const getProducerBlocks = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/producers/${id}/blocks`);

export const getAllBlocks = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "/blocks");

export const getBlock = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/blocks/${id}`);
