axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
  })
  .catch(err => console.log("Error while getting the data: ", err));
  
function printTheChart(stockData) {
  const dailyData = stockData["bpi"];

  const stockDates = Object.keys(dailyData);
  const stockPrices = Object.values(dailyData);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  });
}