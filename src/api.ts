import { baseUrl, fetchJson, postChain } from "./utils/api.util";
import { reduce, find, append } from "ramda";

export const getChains = () => {
  const protocol = location.protocol;

  return fetchJson(`${baseUrl}/chains`)
    .then(
      reduce((acc: any, chain: any) => {
        chain.url =
          protocol === "https:"
            ? find((node: string) => node.indexOf("https") !== -1)(chain.nodes)
            : chain.nodes[0];

        return chain.url !== null ? append(chain, acc) : acc;
      }, [])
    )
    .catch(() => []);
};
export const getChain = (chain_id: string) =>
  fetchJson(`${baseUrl}/chains/${chain_id}`).catch(() => null);
export const addChain = (chainURL: string) =>
  postChain(`${baseUrl}/chain`, chainURL);
