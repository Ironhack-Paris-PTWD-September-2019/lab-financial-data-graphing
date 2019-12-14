const $startDate = document.getElementById("start");
const $endDate = document.getElementById("end");


$startDate.onchange = function () {
  console.log($startDate.value);
  appelAxios()// requete axios a l'api
}

$endDate.onchange = function () {
  console.log($endDate.value);
  appelAxios()// requete axios a l'api
}






function appelAxios(){ 
  const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${$startDate.value}&end=${$endDate.value}`
  axios
   .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log("Error while getting the data: ", err));

}

function printTheChart(stockData) {
  const dailyData = stockData["bpi"];
  const stockDates = Object.keys(dailyData);
  console.log(`les dates sont : ${stockDates}`)

  const coinValue = Object.values(dailyData);
  console.log(`les valeurs sont : ${stockDates}`)
  

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Lab Financial",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: coinValue
        }
      ]
    }
  });
}




