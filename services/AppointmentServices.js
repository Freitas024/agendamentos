var appointmentModel = require("../models/Appointment");
var AppointmentFactory = require("../factories/AppointmentFactory");

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

      appos.forEach( appointment => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.Build(appointment));
        }
      });

      return appointments;
    }
  }
}

module.exports = new AppointmentServices();
