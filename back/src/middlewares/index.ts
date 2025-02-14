import { NextFunction, Request, Response } from "express";


export const validateUserRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const campos: string[] = [
    "birthdate",
    "email",
    "nDni",
    "name",
    "password",
    "username",
  ];

  const camposFiltrados: string[] = campos.filter((campo) => !req.body[campo]);

  if (camposFiltrados.length > 0) {
    res
      .status(400)
      .json({
        message: `Faltan información para crear al usuario: ${camposFiltrados.join(
          ", "
        )}`,
      });
  } else {
    next();
  }
};


export const validateAppointmentRegisterData = (req: Request, res: Response, next: NextFunction): void => {
  const campos: string[] = ["date", "time", "userId"]
  const camposFiltrados: string[] = campos.filter((campo) => !req.body[campo]);

  if (camposFiltrados.length > 0) {
    res
      .status(400)
      .json({
        message: `Faltan información para crear la cita: ${camposFiltrados.join(
          ", "
        )}`,
      });
  } else {
    next();
  }


}


export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}