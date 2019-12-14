const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
axios.get(apiUrl)
.then(dataFromAPI=>{
    console.log("Data answer", dataFromAPI);

}).catch(err=>next(err))