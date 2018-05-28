import config from "../config";

export const baseUrl = `https://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url)
        .then((res: any) => res.json()) 
        //.catch(error => console.error(error)); // can we let this fail (let the errors bubble up) so we can catch the errors where it is used?

export const postChain = (url: string, chain: string) =>
    fetch(url, { method: 'POST', body: "url=" + chain, headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((res:any) => res.json())
        .catch((error:any) => console.error(error));
