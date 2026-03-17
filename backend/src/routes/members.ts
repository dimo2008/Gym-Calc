import { Router } from 'express';
import * as membersController from '../controllers/membersController';

const router = Router();

router.get('/', membersController.getAllMembers);
router.get('/:id', membersController.getMemberById);
router.post('/', membersController.createMember);
router.put('/:id', membersController.updateMember);
router.delete('/:id', membersController.deleteMember);

export default router;
