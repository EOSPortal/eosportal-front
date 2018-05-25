import config from "../config";

export const baseUrl = `https://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url)
		.then((res:any) => res.json())
		.catch((error:any) => console.error(error));

export const postJson = (url: string, data:any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{ 'Content-Type': 'application/json' } })
        .then((res:any) => res.json())
        .catch((error:any) => console.error(error));
