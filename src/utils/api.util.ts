import config from "../config";

export const baseUrl = `http://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url).then((res: any) => res.json());

export const postChain = (url: string, chain: string) =>
    fetch(url, { method: 'POST', body: "url=" + chain, headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((res:any) => res.json());
