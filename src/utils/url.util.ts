
export const urlToHostPort = (url:string) => {
	const urlSplit = url.replace('http://', '').replace('https://', '').split('/')[0].split(':');
	const host = urlSplit[0];
	const port = urlSplit[1] || url.indexOf('http://') === 0 ? 80 : 443;
	return {host, port};
};
