import { NextFunction, Request, Response, Router } from 'express';
import { getAppointmentsController, getAppointmentByIdController, registerAppointmentController, cancelStatusAppointmentController } from '../controllers/appointmentController';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import { validateAppointmentRegisterData } from '../middlewares';



const appointmentsRouter: Router = Router();

appointmentsRouter.get('/', (req: Request, res: Response) => getAppointmentsController(req, res));

appointmentsRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => getAppointmentByIdController(req, res));

appointmentsRouter.post('/schedule', (req: Request, res: Response, next: NextFunction) => validateAppointmentRegisterData(req, res, next), //debe ir la firma en el middleware 
   (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) => registerAppointmentController(req, res))

appointmentsRouter.put('/cancel/:id', (req: Request<{ id: string }>, res: Response) => cancelStatusAppointmentController(req, res));

export default appointmentsRouter;