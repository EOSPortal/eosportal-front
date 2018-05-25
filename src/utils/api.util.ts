import config from "../config";
import { map, range, reduce, concat } from "ramda";

export const baseUrl = `https://${config.domain}`;

export const fetchJson = (url: string) =>
    fetch(url)
        .then(responds => responds.json())
        .catch(error => console.error(error));

export const postJson = (url: string, data:any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{ 'Content-Type': 'application/json' } })
        .then(responds => responds.json())
        .catch(error => console.error(error));
