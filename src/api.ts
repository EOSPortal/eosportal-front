import {
  chainUrl,
  baseUrl,
  fetchJson,
  getDataForAllPages
} from "./utils/api.util";
import { concat } from "ramda";

export const getChains = () => getDataForAllPages(`${baseUrl}/api/chains`);

export const getInfos = (chainId: number) =>
  fetchJson(chainUrl(chainId) + "/infos");

export const getAllProducers = async (chainId: number) =>
  getDataForAllPages(chainUrl(chainId) + "/producers");

export const getProducer = (chainId: number) =>
  fetchJson(chainUrl(chainId) + "/producers/");

export const getProducerBlocks = (chainId: number) =>
  fetchJson(`${chainUrl(chainId)}/producers/blocks`);

export const getAllBlocks = (chainId: number) =>
  fetchJson(chainUrl(chainId) + "/blocks");

export const getBlock = (chainId: number, id: number) =>
  fetchJson(`${chainUrl(chainId)}/blocks/${id}`);
