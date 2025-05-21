const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const appointmentServices = require('./services/AppointmentServices');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamentos");


app.get('/', (req, res) => {
    res.render('index');
})

app.get("/consulta", (req, res) => {
    res.render("create");
});

app.post("/create", async(req, res) => {
    var status = await appointmentServices.Create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    )

    if(status) {
        res.redirect("/");
    } else {
        res.send("Erro ao criar agendamento");
    }

});

app.get("/getcalendar", async (req, res) => {

    var consulta = await appointmentServices.GetAll(false);

    res.json(consulta);

});


app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
})