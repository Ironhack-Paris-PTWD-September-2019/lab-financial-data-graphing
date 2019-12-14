const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
axios.get(apiUrl)
.then(dataFromAPI=>{
    const stockData = dataFromAPI.data.bpi; 
    const dailyDates = Object.keys(stockData);
    const dailyPrices = Object.values(stockData);
    
    printTheChart(dailyDates,dailyPrices);

    console.log("Daily Price", dailyPrices, "Daily Date", dailyDates);

}).catch(err=>console.log (err))

function printTheChart(dates,prices){
    const ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx,{
        type:'line',
        data:{
            labels:dates,
            datasets:[{
                label: "Price Index",
                data:prices
            }]
        }

    })
}