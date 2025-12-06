import express from 'express';
import { checkIn, checkOut, getMyAttendance, getAllAttendance } from '../controllers/attendanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes require login

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/my-attendance', getMyAttendance);
router.get('/', admin, getAllAttendance); // Only admin can see all

export default router;
