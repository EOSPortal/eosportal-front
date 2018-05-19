import {
  chainUrl,
  baseUrl,
  fetchJson,
  getDataForAllPages
} from "./utils/api.util";
import { concat } from "ramda";

export const getChains = () => getDataForAllPages(`${baseUrl}/api/chains`);

export const getInfo = (chainId: number) =>
  fetchJson(chainUrl(chainId) + "/infos");

export const getAllProducers = async (chainId: number) =>
  getDataForAllPages(chainUrl(chainId) + "/producers");

export const getProducer = (chainId: number, producerId:number) =>
  fetchJson(`${chainUrl(chainId)}/producers/${producerId}`);

export const getProducerBlocks = (chainId: number, producerId: number) =>
  fetchJson(`${chainUrl(chainId)}/producers/${producerId}/blocks`);

export const getAllBlocks = (chainId: number) =>
  fetchJson(chainUrl(chainId) + "/blocks");

export const getBlock = (chainId: number, blockId: number) =>
  fetchJson(`${chainUrl(chainId)}/blocks/${blockId}`);
