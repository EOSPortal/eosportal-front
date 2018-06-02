import { baseUrl, fetchJson, postChain } from "./utils/api.util";
import { reduce, find, append } from "ramda";

export const getChains = () => {
  const protocol = location.protocol.substring(0, location.protocol.length - 1);

  return fetchJson(`${baseUrl}/chains`)
    .then(
      reduce((acc: any, chain: any) => {
        chain.url = find((node: string) => node.indexOf(protocol) !== -1)(
          chain.nodes
        );
        return chain.url !== null ? append(chain, acc) : acc;
      }, [])
    )
    .catch(() => []);
};
export const getChain = (chain_id: string) =>
  fetchJson(`${baseUrl}/chains/${chain_id}`).catch(() => null);
export const addChain = (chainURL: string) =>
  postChain(`${baseUrl}/chain`, chainURL);
