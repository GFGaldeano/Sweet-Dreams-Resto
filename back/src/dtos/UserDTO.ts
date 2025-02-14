export interface UserRegisterDTO {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    username: string;
    password: string;

  }
  
  export interface UserLoginDTO {
    username: string;
    password: string;
  }
  
  export interface IUserDTO{
    id: number
    name: string
    email: string
    birthdate: Date
    nDni: number
  }

  export interface UserLoginDTO {
    username: string;
    password: string;
  }

  export interface IUserLoginSuccesDTO {
    login: boolean;
    user: IUserDTO;
}