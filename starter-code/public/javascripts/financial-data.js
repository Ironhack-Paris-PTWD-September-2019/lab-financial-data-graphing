var ctx = document.getElementById('myChart').getContext('2d');

const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getCoinData(theDate) {
  coinDeskApi
    .get(theDate)
    .then(responseFromAPI => {
      console.log("Response from API is: ", Object.values(responseFromAPI.data.bpi))
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(responseFromAPI.data.bpi),
          datasets: [{
            data: Object.values(responseFromAPI.data.bpi)
          }]
        },
      });
    })
    .catch(err => console.log("Error is: ", err));
}

document.getElementById("theButton").onclick = function() {
  const date = document.getElementById("theInput").value;
  getCoinData(date);
};


