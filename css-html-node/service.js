const express = require('express');
const app = express();
const PORT = process.env.PORT || 1000;
const path = require('path');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.set('view engine', 'html');
app.use("/style", express.static(path.join(__dirname + "/view-info/style")));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/view-info/view/home.html'))
});
app.get('/express', (req, res) => {
    res.send(String(express));
    console.log(express);
});

app.post('/', (req, res) => {
    console.log("data>>>", req.body);
    //res.send(req.body);
    res.sendFile(path.join(__dirname +'/view-info/view/success.html'))

    // res.render(path.join(__dirname +'/view-info/view/success.html'))
})

app.listen(PORT, (req, res) => {
    console.log("port:", PORT)
});