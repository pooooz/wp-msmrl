import express from 'express';
import { signIn, updateToken } from '../../controllers/sign-in/signInController';

const router = express.Router();

router.post('/', signIn);
router.post('/updateToken', updateToken);

export { router as signInRouter };
