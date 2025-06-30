var appointmentModel = require("../models/Appointment");
var AppointmentFactory = require("../factories/AppointmentFactory");
var mailer = require("nodemailer");


require('dotenv').config();

class AppointmentServices {
  async Create(name, email, cpf, description, date, time) {
    const appointment = new appointmentModel({
      name: name,
      email: email,
      cpf: cpf,
      description: description,
      date: date,
      time: time,
      finished: false,
      notified: false,
    });

    try {
      await appointment.save();
      console.log(`Agendamento de ${name} criado com sucesso!`);
      return true;
    } catch (error) {
      console.error(`Erro ao criar agendamento: ${error}`);
      return false;
    }
  }

  async GetAll(showFinished) {
    if (showFinished) {
      return await appointmentModel.find();
    } else {
      var appos = await appointmentModel.find({ finished: false });
      var appointments = [];

      appos.forEach(appointment => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.Build(appointment));
        }
      });

      return appointments;
    }
  }

  async GetById(id) {

    try {
      return await appointmentModel.findById(id);

    } catch (error) {
      console.log(error);
    }
  }

  async Finish(id) {
    try {
      await appointmentModel.findByIdAndUpdate(id, { finished: true });
      return true;

    } catch (error) {
      console.log(`Erro: ${error}`);
      return false;
    }
  }

  async search(query) {
    try {
      var appos = await appointmentModel.find().or([{ email: query }, { cpf: query }])
      return appos;
    } catch (error) {
      console.log(error);
      return [];
    }
    console.log(appos);
  }

}

module.exports = new AppointmentServices();
