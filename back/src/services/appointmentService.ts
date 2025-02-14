import { StdioNull } from 'child_process';
import { AppointmentModel } from '../config/data-source';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import { Appointment } from '../entities/Appointment';

import { Status } from "../interfaces/IAppointment";
import { NotFoundError } from '../middlewares';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { getUserByIdService } from "./userService";


export const registerAppointmentService = async (
  appointment: AppointmentRegisterDTO
): Promise<Appointment> => {
  await getUserByIdService(appointment.userId);
  AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
  await AppointmentRepository.validateExistingAppoint(
    appointment.userId,
    appointment.date,
    appointment.time
  );

  const newAppointment = AppointmentRepository.create({
    date: appointment.date,
    time: appointment.time,
    user: { id: appointment.userId },
  });

  return await AppointmentRepository.save(newAppointment);
};



export const getAppointmentService = async (): Promise<Appointment[]> => {
  const appointmentRepository = AppointmentModel;
  const appointments = await appointmentRepository.find({
    relations: {
      user: true,
    },
  });
  return appointments || []; 
};



export const getAppointmentByIdService = async (id: string): Promise<Appointment | null> => {
  const appointmentRepository = AppointmentModel;
  const appointmentFound = await appointmentRepository.findOneBy({ id: parseInt(id, 10) });

  return appointmentFound;
};



export const cancelStatusAppointmentService = async (id: string): Promise<Appointment | null> => {
  const appointmentFound = await AppointmentModel.findOneBy({ id: parseInt(id, 10) });

  if (!appointmentFound) {
    throw new NotFoundError(`La cita con id ${id} no fue encontrada`);
  }

  appointmentFound.status = Status.Cancelled;
  await AppointmentModel.save(appointmentFound);

  return appointmentFound;
};