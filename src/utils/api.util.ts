import config from "../config";

export const baseUrl = `http://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url)
        .then((res: any) => res.json());

export const postJson = (url: string, data:any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{ 'Content-Type': 'application/json' } })
        .then((res:any) => res);
