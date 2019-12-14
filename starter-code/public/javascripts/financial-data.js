var startdate=document.getElementById("startdate").value;
var enddate=document.getElementById("enddate").value;
var currency=document.getElementById("currency").value;

function obtainData(startdate,enddate,currency){
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startdate}&end=${enddate}&currency=${currency}`)
  .then(responseFromAPI => {
      console.log("The response from API: ", responseFromAPI)
      printTheChart(responseFromAPI.data)
  })
  .catch(err => console.log("Error while getting the data: ", err));
}

/* chart */
function printTheChart(data) {
    const dailyData = data.bpi;
  
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

document.getElementById("startdate").addEventListener('change', function (evt) {
  startdate=document.getElementById("startdate").value;
  enddate=document.getElementById("enddate").value;
  currency=document.getElementById("currency").value;
  obtainData(startdate,enddate,currency);
});

document.getElementById('enddate').addEventListener('change', function (evt) {
  startdate=document.getElementById("startdate").value;
  enddate=document.getElementById("enddate").value;
  currency=document.getElementById("currency").value;
  obtainData(startdate,enddate,currency);
});

document.getElementById('currency').addEventListener('change', function (evt) {
  startdate=document.getElementById("startdate").value;
  enddate=document.getElementById("enddate").value;
  currency=document.getElementById("currency").value;
  obtainData(startdate,enddate,currency);
});


