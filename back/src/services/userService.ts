import { AppDataSource, UserModel } from "../config/data-source";
import { IUserLoginSuccesDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { checkCredentials, createCredentialService } from "./credentialService";



export const getUserService = async (): Promise<User[]> => {
  const users: User[] = await UserModel.find()
  return users;
};



export const getUserByIdService = async (id: number): Promise<User> => {

  const userFound = await UserModel.findOne({
    where: {
      
      id
    },
    relations: ["appointments"]
  })

  if (!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`)
  else return userFound;
};



export const registerUserService = async (user: UserRegisterDTO): Promise<User> => {

  const result = await AppDataSource.transaction(async (entityManager) => {

    const userCrentials: Credential = await createCredentialService(entityManager, user.username, user.password)
    const newUser: User = entityManager.create(User, {
      name: user.name,
      birthdate: user.birthdate,
      email: user.email,
      nDni: user.nDni,
      credentials: userCrentials
    })

    return await entityManager.save(newUser)
  })
  return result
};



export const loginUserService = async (user: UserLoginDTO): Promise<IUserLoginSuccesDTO> => {
  const credentialId: number | undefined = await checkCredentials(
    user.username,
    user.password
  );

  const userFound: User | null = await UserModel.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });

  return {
    login: true,
    user: {
      id: userFound?.id ?? 0,
      name: userFound?.name ?? "",
      email: userFound?.email ?? "",
      birthdate: userFound?.birthdate ?? new Date(),
      nDni: userFound?.nDni ?? 0,
    },
  };
};


