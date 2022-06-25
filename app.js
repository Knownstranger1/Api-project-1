const express = require('express')
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) =>
 {
    res.sendfile(__dirname+("/index.html"));
});
app.post('/',(req,res)=>
{
const query = req.body.city; 
    const unit = "metric"
    const apikey = "09c205f3decceae889ff7f53801b8148";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit 
    https.get(url,(responce)=>
    {
     responce.on("data",(data)=>
     {
        const data1 = JSON.parse(data); 
        const data2 = data1.main.temp;
        const data3 = data1.weather[0].description;
        console.log(data2);
        const icon= data1.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>temperature in "+query+" is " + data2 + " and weather is "+data3 +"</h1>");
        res.write("<img src="+imgurl+">");
        res.send();
     });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))