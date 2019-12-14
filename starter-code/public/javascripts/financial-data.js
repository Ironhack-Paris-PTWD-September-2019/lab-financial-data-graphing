//Axios request 
var inputFrom=document.getElementById('from');
var inputTo=document.getElementById('to');
updateChart();


inputFrom.addEventListener('change', updateChart);

inputTo.addEventListener('change', updateChart);

function updateChart(){
  inputToValue=inputTo.value;
  inputFromValue=inputFrom.value;
  var apiUrl=`http://api.coindesk.com/v1/bpi/historical/close.json?start=${inputFromValue}&end=${inputToValue}`;

  axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log(responseFromAPI.data);
    chartBitCoin(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log("Error while getting the data: ", err));

}






function chartBitCoin(data) {
  var ctx = document.getElementById('chart').getContext('2d');
  var dates= Object.keys(data.bpi); 
  var bitcoinPrice=dates.map(date=> data.bpi[date]);

  var myChart=new Chart(ctx,{
    type:"line", 
    data:{
      labels:dates, 
      datasets:[
        {
          label:"Bitcoin Price Index", 
          backgroundColor: 'grey',
          borderColor: 'black',
          data: bitcoinPrice
        }
      ]
    }

  });
}

