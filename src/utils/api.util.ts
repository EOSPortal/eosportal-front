import config from "../config";
import { map, range, reduce, concat } from "ramda";

export const baseUrl = `http://${config.domain}`;
export const chainUrl = (chainName: string) =>
  `http://${chainName}.${config.domain}/api`;

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

const log = (data: any) => {
  console.log(data);
  return data;
};
