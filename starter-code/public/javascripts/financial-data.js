

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(responseFromAPI => {
      const dates = Object.keys(responseFromAPI.data.bpi)
      const values = Object.values(responseFromAPI.data.bpi)
      console.log(dates)
      console.log(values)

      printGraph(dates,values);
  })
  .catch(err => console.log("Error while getting the data: ", err));


function printGraph(dates, values) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(229, 229, 229)",
          borderColor: "rgb(132, 127, 127)",
          data: values
        }
      ]
    }
  });
}