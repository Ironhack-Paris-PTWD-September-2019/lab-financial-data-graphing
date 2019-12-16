const coindeskApi = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/`
});

function getCoinValue(startDate, endDate) {
    coindeskApi
        .get(`close.json?start=${startDate}&end=${endDate}`)
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


// set initial values to date inputs
const todayObj = new Date();
const oneWeekAgoObj = new Date(new Date().setDate(new Date().getDate()-7));

const todayYear = todayObj.getFullYear();
const todayMonth = ('0' + (todayObj.getMonth() + 1)).slice(-2);
const todayDay = ('0' + todayObj.getDate()).slice(-2);

const oneWeekAgoYear = oneWeekAgoObj.getFullYear();
const oneWeekAgoMonth = ('0' + (oneWeekAgoObj.getMonth() + 1)).slice(-2);
const oneWeekAgoDay = ('0' + oneWeekAgoObj.getDate()).slice(-2);

const today = `${todayYear}-${todayMonth}-${todayDay}`;
const oneWeekAgo = `${oneWeekAgoYear}-${oneWeekAgoMonth}-${oneWeekAgoDay}`;

document.getElementById(`startDate`).value = oneWeekAgo;
document.getElementById(`endDate`).value = today;
getCoinValue(oneWeekAgo, today);


// add a listener on each input with .eventListener and update the graph in case of an event
[...document.getElementsByClassName(`eventListener`)].forEach(input => 
    {
        input.addEventListener(`change`, () => {
            const $startDate = document.getElementById(`startDate`).value;
            const $endDate = document.getElementById(`endDate`).value;
            getCoinValue($startDate, $endDate)
        });
    }
)