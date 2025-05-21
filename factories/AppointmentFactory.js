class AppointmentFactory {
    Build(simplesAppointment) {
        let year, month, day;

        if (typeof simplesAppointment.date === "string") {
            [year, month, day] = simplesAppointment.date.split("-").map(Number);
        }
        else if (simplesAppointment.date instanceof Date) {
            year = simplesAppointment.date.getFullYear();
            month = simplesAppointment.date.getMonth() + 1;
            day = simplesAppointment.date.getDate();
        } else {
            throw new Error("Formato de data inválido em simplesAppointment.date");
        }

        const hour = parseInt(simplesAppointment.time.split(":")[0]);
        const minutes = parseInt(simplesAppointment.time.split(":")[1]);

        const startDate = new Date(year, month - 1, day, hour, minutes, 0, 0);

        return {
            id: simplesAppointment.id,
            title: `${simplesAppointment.name} - ${simplesAppointment.description}`,
            start: startDate,
            end: startDate,
        };
    }
}

module.exports = new AppointmentFactory();

