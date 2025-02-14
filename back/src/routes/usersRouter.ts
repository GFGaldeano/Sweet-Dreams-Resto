import { Request, Response, Router, NextFunction } from 'express';
import { getUsersController, getUserByIdController, registerUserController, loginUserController } from '../controllers/userController';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { validateUserRegisterData } from '../middlewares';



const usersRouter: Router = Router();


usersRouter.get('/', (req: Request, res: Response) => getUsersController(req, res)); // esta firma es igual a la de la funcion getUsersController

usersRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res)); // esta firma es igual a la de la funcion getUserByIdController

usersRouter.post('/register',
   (req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next),
   (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => registerUserController(req, res));

usersRouter.post('/login', (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => loginUserController(req, res));


export default usersRouter;