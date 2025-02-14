import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import {
  cancelStatusAppointmentService,
  getAppointmentByIdService,
  getAppointmentService,
  registerAppointmentService,
} from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import { PostgresError } from "../interfaces/ErrorInterface";
import { NotFoundError } from "../middlewares";





export const getAppointmentsController = async (req: Request, res: Response) => {
  const appointments = await getAppointmentService();

  if (!appointments || appointments.length === 0) {
    return res.status(404).json({ message: "No se encontraron citas" });
  }

  res.status(200).json(appointments);
};


export const registerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const response = await registerAppointmentService(req.body);
    res.status(201).json({
      message: "Cita creada con éxito",
      data: response,
    });
  } catch (error) {
    const err = error as PostgresError;
    res.status(400).json({
      message: "Error en el servidor",
      data:
        err instanceof Error
          ? err.detail
            ? err.detail
            : err.message
          : "error desconocido",
    });
  }
};



export const getAppointmentByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment: Appointment | null = await getAppointmentByIdService(id);
    if (!appointment) {
      return res.status(404).json({
        message: `La cita con id ${id} no fue encontrada`,
      });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error en el servidor',
    });
  }
};



export const cancelStatusAppointmentController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await cancelStatusAppointmentService(id);
    res.status(200).json({
      message: `Cambiar el estado de un turno a "cancelled": ${id}`,
      data: response,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        message: `Error del servidor. La cita: ${id} no fue encontrada`,
        data: error instanceof Error ? error.message : "Error desconocido",
      });
    } else {
      console.error(error);
      res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  }
};
