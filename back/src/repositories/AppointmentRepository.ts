import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes, 0);

    const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
    const dateNowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

    if (appointmentDate< dateNowArg) {
      throw new Error("No se pueden agendar citas correspondientes a fechas pasadas");
    }

    const diffMilliSeconds = new Date().getTime() - appointmentDate.getTime();
    const diffInHours = diffMilliSeconds / (1000 * 60 * 60);

    if (diffInHours > 24) {
      throw new Error("No se pueden agendar citas con menos de 24 horas de antelación");
    }

    const dayOfWeek = appointmentDateArg.getUTCDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      throw new Error("No se pueden agendar citas los fines de semana");
    }

    if ((hours < 12 || hours > 14) && (hours < 21 || hours > 23)) {
      throw new Error("Las citas no pueden agendarse por fuera del horario de 12pm a 13pm y de 21pm a 23pm");
    }
  },
  validateExistingAppoint: async function (userId: number, date: Date, time: string): Promise<void> {
    const appointmentFound = await this.findOne({
      where: {
        user: {
          id: userId,
        },
        date: date,
        time: time,
      },
    });

    if (appointmentFound)
      throw new Error(
        `La cita con fecha: ${date}, y hora: ${time}, para el usuario con id: ${userId}, ya existe`
      );
  }
}

);

