import { Request, Response } from "express";
import {
  IUserDTO,
  IUserLoginSuccesDTO,
  UserLoginDTO,
  UserRegisterDTO,
} from "../dtos/UserDTO";
import {
  registerUserService,
  getUserService,
  getUserByIdService,
  loginUserService,
} from "../services/userService";
import { User } from "../entities/User";
import { PostgresError } from "../interfaces/ErrorInterface";

export const getUsersController = async (req: Request, res: Response) => {
  const users: IUserDTO[] = await getUserService();
  res.status(200).json(users);
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user: User = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: "Error del servidor",
      data: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const response = await registerUserService(req.body);
    res.status(201).json({
      message: "Registro de un nuevo usuario.",
      data: response,
    });
  } catch (error) {
    const postgresError = error as PostgresError;
    res.status(400).json({
      message: "Error en el servidor",
      data:
        postgresError instanceof Error
          ? postgresError.detail
            ? postgresError.detail
            : postgresError.message
          : "Error desconocido",
    });
  }
};

export const loginUserController = async (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): Promise<void> => {
  try {
    const response: IUserLoginSuccesDTO | null = await loginUserService(
      req.body
    );
    res.status(200).json(response);
  } catch (error) {
    const postgresError = error as PostgresError;
    res.status(400).json({
      message: "Error en el servidor",
      data:
        postgresError instanceof Error
          ? postgresError.detail
            ? postgresError.detail
            : postgresError.message
          : "error desconocido",
    });
  }
};
