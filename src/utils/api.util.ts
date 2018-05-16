import config from "../config";
import { map, range, reduce, concat } from "ramda";

export const baseUrl = `https://${config.domain}`;
export const chainUrl = (chainName: string) =>
  `https://${chainName}.${config.domain}/api`;

export const fetchJson = (url: string) =>
  fetch(url).then(responds => responds.json());

export const getDataForPages = async (
  resource: string,
  from: number,
  to: number
) => {
  const fetchPages: (pageIndexes: number[]) => Promise<any>[] = map(index =>
    fetchJson(resource + "?page=" + index)
  );
  const accumulateData: (data: any[]) => any[] = reduce(
    (acc: any[], { data }) => concat(acc, data),
    []
  );

  const promises = fetchPages(range(from)(to + 1));
  const responses = await Promise.all(promises);
  return accumulateData(responses);
};

export const getDataForAllPages = async(resource: string) => {
    // get first page/list of results
    const responds = await fetchJson(resource);
    if (responds.current_page === responds.last_page) {
      return responds.data;
    }
  
    // if their are more pages get the rest of the pages
    const headData = responds.data;
    const tailData = await getDataForPages(
      resource,
      responds.current_page + 1,
      responds.last_page
    );
    return concat(headData, tailData);
}

const log = (data: any) => {
  console.log(data);
  return data;
};
