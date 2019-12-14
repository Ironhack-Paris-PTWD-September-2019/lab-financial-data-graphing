const fromDate = document.getElementById("from").value;
const toDate = document.getElementById("to").value;


axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(bitcoinData => printTheChart(bitcoinData.data))
  .catch(err => console.log("Error while getting the data: ", err));


  function printTheChart(bitcoinData) {
    console.log("The response from API: ", bitcoinData);

    const dailyData = bitcoinData.bpi;
    console.log("dailyData", dailyData);

    const bitcoinDates = Object.keys(dailyData);
    console.log(bitcoinDates);
    const bitcoinValue = Object.values(dailyData);
    console.log("bitcoinValue", bitcoinValue);


    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: bitcoinDates,
          datasets: [
            {
              label: "Bitcoin Chart",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: bitcoinValue
            }
          ]
        }

  })}
    /*
    console.log("Test", dailyData);
    
   
      const bitcoinDates = Object.keys(dailyData);
    const bitcoinValue = bitcoinDates.map( date => dailyData[date]["4. close"] );

    });

        const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: bitcoinDates,
          datasets: [
            {
              label: "Bitcoin Chart",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: bitcoinValue
            }
          ]
        }
  }
*/