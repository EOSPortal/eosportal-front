import config from "../config";

export const baseUrl = `//${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url).then((res: any) => res.json());

export const postChain = (url: string, chain: string) =>
    fetch(url, { method: 'POST', body: "url=" + chain, headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((res:any) => res.json());

// Any bp urls which does not return within 500ms is considered to be "holding up the line".
export const getBpStandardInfo = (bpUrl: string) => {
	const url = bpUrl.indexOf('http') !== 0 ? 'http://'+bpUrl : bpUrl;
	return Promise.race([
		new Promise((res, rej) => setTimeout(() => rej(false), 1500)).catch(() => null),
		fetch(`//${config.domain}/bps/${url}`).then((res: any) => res.json()).catch(() => null)
	]);
}

