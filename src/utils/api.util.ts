import config from "../config";

export const baseUrl = `https://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url)
        .then((res: any) => res.json()) 
        //.catch(error => console.error(error)); // can we let this fail (let the errors bubble up) so we can catch the errors where it is used?

export const postJson = (url: string, data:any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{ 'Content-Type': 'application/json' } })
        .then((res:any) => res.json())
        .catch((error:any) => console.error(error));
