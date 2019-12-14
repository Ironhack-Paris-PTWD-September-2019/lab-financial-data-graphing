//Axios request 
var inputFrom=document.getElementById('from');
var inputTo=document.getElementById('to');
var currency=document.getElementById('currency');
var minSpan=document.getElementById('min-value');
var maxSpan=document.getElementById('max-value');
updateChart();


inputFrom.addEventListener('change', updateChart);
inputTo.addEventListener('change', updateChart);
currency.addEventListener('change', updateChart);

function updateChart(){
  var inputToValue=inputTo.value;
  var inputFromValue=inputFrom.value;
  var currencyValue=currency.value;
  var apiUrl=`http://api.coindesk.com/v1/bpi/historical/close.json?start=${inputFromValue}&end=${inputToValue}&currency=${currencyValue}`;

  axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    chartBitCoin(responseFromAPI.data); 
    minSpan.innerHTML+=" " + currencyValue.toString().toUpperCase();
    maxSpan.innerHTML+=" " + currencyValue.toString().toUpperCase(); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log("Error while getting the data: ", err));

}






function chartBitCoin(data) {
  var ctx = document.getElementById('chart').getContext('2d');
  var dates= Object.keys(data.bpi); 
  var bitcoinPrice=dates.map(date=> data.bpi[date]);
  var minValue=Math.min(...bitcoinPrice);
  var maxValue=Math.max(...bitcoinPrice);
  minSpan.innerHTML=minValue;
  maxSpan.innerHTML=maxValue; 

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

