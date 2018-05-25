export const getTimeSince = (unixTimestamp: number) => {
    const unixTimeNow = Date.now() / 1000
    const secondsSince = unixTimeNow - unixTimestamp

    if(secondsSince < 60) {
        return `${Math.ceil(secondsSince)} seconds`
    }
    else if (secondsSince < 3600) {
        return `${Math.ceil(secondsSince/60)} minutes`
    }
    else if (secondsSince < 86400) {
        return `${Math.ceil(secondsSince/3600)} hours`
    }
    else {
        return `${Math.ceil(secondsSince/86400)} days`
    }
}