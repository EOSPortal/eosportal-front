import {
  chainUrl,
  baseUrl,
  fetchJson,
  getDataForPages
} from "./utils/api.util";
import { concat } from "ramda";

export const getChains = () => fetchJson(`${baseUrl}/api/chains`);

export const getInfos = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "/infos");

export const getAllProducers = async (chainName: string) => {
  // get list of 25 first producers
  const responds = await fetchJson(chainUrl(chainName) + "/producers");
  if (responds.current_page === responds.last_page) {
    return responds.data;
  }

  // if their are more pages get the rest of the pages
  const headData = responds.data;
  const tailData = await getDataForPages(
    chainUrl(chainName) + "/producers",
    responds.current_page + 1,
    responds.last_page
  );
  return concat(headData, tailData);
};

export const getProducer = (chainName: string, id: string) =>
  fetchJson(chainUrl(chainName) + "/producers/" + id);

export const getProducerBlocks = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/producers/${id}/blocks`);

export const getAllBlocks = (chainName: string) =>
  fetchJson(chainUrl(chainName) + "/blocks");

export const getBlock = (chainName: string, id: string) =>
  fetchJson(`${chainUrl(chainName)}/blocks/${id}`);
