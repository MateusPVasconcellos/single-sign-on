import { Router } from 'express';
import { signupController } from '../controller/signup-controller';

const routes = Router();

routes.post('/signup', signupController.signup);

export default routes;
