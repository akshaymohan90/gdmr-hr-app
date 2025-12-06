import express from 'express';
import { applyLeave, managerAction, adminAction, getLeaves } from '../controllers/leaveController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', applyLeave);
router.get('/', getLeaves); // Filtered inside controller based on role
router.put('/:id/manager', managerAction); // Manager approval
router.put('/:id/admin', admin, adminAction); // Admin approval

export default router;
