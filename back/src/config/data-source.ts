import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential"


import { DB_NAME, DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNC,
  logging: DB_LOGGING,
  entities: DB_ENTITIES,
  dropSchema: DB_DROP,
});




export const UserModel = AppDataSource.getRepository(User)
export const AppointmentModel = AppDataSource.getRepository(Appointment)
export const CredentialModel = AppDataSource.getRepository(Credential)
