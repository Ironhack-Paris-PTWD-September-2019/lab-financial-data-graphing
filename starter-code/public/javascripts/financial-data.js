const coindeskApi = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json`
});

function getCoinValue() {
    coindeskApi
        .get()
        .then(coinData => console.log(coinData.data.bpi))
        .catch(err => console.error(err))
}

getCoinValue();