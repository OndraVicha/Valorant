const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const app = express();
const csv = require('csvtojson');

let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static("public"));

consturlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/savedata', urlencodedParser, (req, res) => {
    let str = `"${req.body.bestmap}","${req.body.worstmap}","${req.body.duelists}","${req.body.controlers}","${req.body.initiators}","${req.body.sentinels}"\n`;
    fs.appendFile(path.join(__dirname, 'data/vysledky.csv'), str, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                 success: false, 
                 message: "Nastala chyba během ukládání souboru" 
                });
        }
    });
    res.redirect(301, '/');
});
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get("/todolist", (req, res) =>{csvtojson({headers:['bestmap','worstmap','duelists','controlers','initiators','sentinels']}).fromFile(path.join(__dirname, 'data/vysledky.csv')).then(data =>{res.render('index', {nadpis: "Valorant", vysledky: data});}).catch(err =>{console.log(err);res.render('error', {nadpis: "Chyba v aplikaci", chyba: err});}); });
app.listen(port, () => { console.log(`Server naslouchá na portu ${port}`); });
