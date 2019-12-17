const coindeskApi = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/`
});

let chart; // initialize chart outside getCoinValue function

function getCoinValue(startDate, endDate, currency, init) {
    coindeskApi
        .get(`close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then(coinValue => {
            if(!init) { // if chart already created, it needs to be destroyed to prevent previous graph hover events to be triggered
                chart.destroy();
            }

            const dailyData = coinValue.data.bpi;
            const coinDates = Object.keys(dailyData);
            const coinValues = Object.values(dailyData);
            
            // define min and max values
            const coinValuesArray = [...coinValues];
            const minValue = Math.min.apply(null, coinValuesArray).toFixed(2);
            const maxValue = Math.max.apply(null, coinValuesArray).toFixed(2);

            // display results on html
            document.getElementById(`minValue`).innerText = `${minValue} ${currency}`;
            document.getElementById(`maxValue`).innerText = `${maxValue} ${currency}`;

            const $ctx = document.getElementById(`myChart`).getContext(`2d`);
            
            chart = new Chart($ctx, {
                type: `line`,
                data: {
                    labels: coinDates,
                    datasets: [{
                        label: `Bitcoin Price Index`,
                        data: coinValues
                    }]   
                }
            });
        })
        .catch(err => console.error(err))
}


// INITIAL VALUES

// determine today and "one week ago" values
const todayObj = new Date();
const oneWeekAgoObj = new Date(new Date().setDate(new Date().getDate() - 7));

const todayYear = todayObj.getFullYear();
const todayMonth = ('0' + (todayObj.getMonth() + 1)).slice(-2);
const todayDay = ('0' + todayObj.getDate()).slice(-2);

const oneWeekAgoYear = oneWeekAgoObj.getFullYear();
const oneWeekAgoMonth = ('0' + (oneWeekAgoObj.getMonth() + 1)).slice(-2);
const oneWeekAgoDay = ('0' + oneWeekAgoObj.getDate()).slice(-2);

const today = `${todayYear}-${todayMonth}-${todayDay}`;
const oneWeekAgo = `${oneWeekAgoYear}-${oneWeekAgoMonth}-${oneWeekAgoDay}`;

// define possible currency values
const currencyList = [`EUR`, `USD`];

// update inputs with inital values & display graph
document.getElementById(`startDate`).value = oneWeekAgo;
document.getElementById(`endDate`).value = today;
document.getElementById(`currency`).value = currencyList[0];
getCoinValue(oneWeekAgo, today, currencyList[0], true);

// add a listener on each input with .eventListener and update the graph in case of an event
[...document.getElementsByClassName(`eventListener`)].forEach(input => 
    {
        input.addEventListener(`change`, () => {
            const $startDate = document.getElementById(`startDate`).value;
            const $endDate = document.getElementById(`endDate`).value;
            const $currency = document.getElementById(`currency`).value;
            getCoinValue($startDate, $endDate, $currency)
        });
    }
)