const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const appointmentServices = require('./services/AppointmentServices');
const Appointment = require('./models/Appointment');
const AppointmentServices = require('./services/AppointmentServices');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamentos");


app.get('/', (req, res) => {
    res.render('index');
})

app.get("/consulta", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    var status = await appointmentServices.Create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    )

    if (status) {
        res.redirect("/");
    } else {
        res.send("Erro ao criar agendamento");
    }

});


app.get("/getcalendar", async (req, res) => {

    var consulta = await appointmentServices.GetAll(false);

    res.json(consulta);

});

app.get("/event/:id", async (req, res) => {
    var appointment = await AppointmentServices.GetById(req.params.id);
    console.log(appointment);
    res.render("event", { appo: appointment });
})


app.post("/finish", async (req, res) => {
    var id = req.body.id;
    var result = await appointmentServices.Finish(id);
    res.redirect("/");
});


app.get("/list", async (req, res) => {
    var appos = await appointmentServices.GetAll(true);
    res.render("list", { appos });
});

app.get("/searchresult", async (req, res) => {

    var appos = await appointmentServices.search(req.query.search);

    res.render("list", { appos });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 3000`);
})