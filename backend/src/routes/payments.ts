import { Router } from 'express';
import * as paymentsController from '../controllers/paymentsController';

const router = Router();

router.get('/', paymentsController.getAllPayments);
router.get('/:id', paymentsController.getPaymentById);
router.post('/', paymentsController.createPayment);
router.put('/:id', paymentsController.updatePayment);
router.delete('/:id', paymentsController.deletePayment);

export default router;
