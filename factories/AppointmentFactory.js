class AppointmentFactory {
    Build(simplesAppointment) {
        let year, month, day;

        if (typeof simplesAppointment.date === "string") {
            [year, month, day] = simplesAppointment.date.split("-").map(Number);
        } else if (simplesAppointment.date instanceof Date) {
            year = simplesAppointment.date.getFullYear();
            month = simplesAppointment.date.getMonth() + 1;
            day = simplesAppointment.date.getDate();
        } else {
            throw new Error("Formato de data inválido em simplesAppointment.date");
        }

        const [hour, minutes] = simplesAppointment.time.split(":").map(Number);

        const startDate = new Date(Date.UTC(year, month-1, day + 1, hour, minutes));
        console.log(startDate.toISOString()); // '2025-07-06T23:30:00.000Z'


        const appo = {
            id: simplesAppointment._id?.toString() || simplesAppointment.id,
            title: `${simplesAppointment.name} - ${simplesAppointment.description}`,
            start: startDate.toISOString(),
            end: startDate.toISOString(),
            notified: simplesAppointment.notified,
            email: simplesAppointment.email
        };

        return appo;
    }
}

module.exports = new AppointmentFactory();

