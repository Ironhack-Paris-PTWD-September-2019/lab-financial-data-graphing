const coindeskApi = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json`
});

function getCoinValue() {
    coindeskApi
        .get()
        .then(coinValue => {
            const dailyData = coinValue.data.bpi;
            const coinDates = Object.keys(dailyData);
            const coinValues = Object.values(dailyData);

            console.log(coinDates, coinValues)

            const $ctx = document.getElementById(`myChart`).getContext(`2d`);
            const chart = new Chart($ctx, {
                type: `line`,
                data: {
                    labels: coinDates,
                    datasets: [{
                        label: `Bitcoin Price Index`,
                        data: coinValues
                    }]   
                }
            })
            console.log(dailyData)
        })
        .catch(err => console.error(err))
}

getCoinValue();