

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(responseFromAPI => {
      const date = Object.keys(responseFromAPI.data.bpi)
      const value = Object.values(responseFromAPI.data.bpi)
      printData(date,value);
  })
  .catch(err => console.log("Error while getting the data: ", err));

  function printData(date,value) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: date,

        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgb(233, 233, 233)",
            borderColor: "rgb(rgb(227, 227, 227))",
            data: value
          }
        ]
      }
    });
  }