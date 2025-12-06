import Attendance from '../models/Attendance.js';

// Helper to get IST time
const getISTTime = () => {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
};

const getISTDateString = () => {
    // Returns YYYY-MM-DD in IST
    const ist = getISTTime();
    const year = ist.getFullYear();
    const month = String(ist.getMonth() + 1).padStart(2, '0');
    const day = String(ist.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Check Time Windows
const isMorningWindow = (now) => {
    // Until 10:15 AM
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return (hours < 10) || (hours === 10 && minutes <= 15);
};

const isAfternoonWindow = (now) => {
    // 1:00 PM to 2:00 PM
    const hours = now.getHours();
    return (hours === 13);
};

const isCheckoutWindow = (now) => {
    // 6:00 PM to 7:30 PM
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if (hours === 18) return true; // 6:00-6:59 PM
    if (hours === 19 && minutes <= 30) return true; // 7:00-7:30 PM
    return false;
};

export const checkIn = async (req, res) => {
    const userId = req.user._id;
    const nowIST = getISTTime();
    const dateStr = getISTDateString();

    // Check existing
    const existing = await Attendance.findOne({ user: userId, date: dateStr });
    if (existing && existing.checkIn) {
        return res.status(400).json({ message: 'Already checked in for today' });
    }

    // Validate Window
    if (!isMorningWindow(nowIST) && !isAfternoonWindow(nowIST)) {
        return res.status(400).json({
            message: 'Check-in allowed only before 10:15 AM or between 1:00 PM - 2:00 PM IST',
            currentTimeIST: nowIST.toLocaleTimeString()
        });
    }

    const attendance = await Attendance.findOneAndUpdate(
        { user: userId, date: dateStr },
        {
            user: userId,
            date: dateStr,
            checkIn: nowIST,
            status: 'Present' // Tentative, check-out might affect this
        },
        { upsert: true, new: true }
    );

    res.json(attendance);
};

export const checkOut = async (req, res) => {
    const userId = req.user._id;
    const nowIST = getISTTime();
    const dateStr = getISTDateString();

    const attendance = await Attendance.findOne({ user: userId, date: dateStr });
    if (!attendance || !attendance.checkIn) {
        return res.status(400).json({ message: 'You have not checked in today' });
    }

    // Validate Window
    if (!isCheckoutWindow(nowIST)) {
        return res.status(400).json({
            message: 'Check-out allowed only between 6:00 PM - 7:30 PM IST',
            currentTimeIST: nowIST.toLocaleTimeString()
        });
    }

    attendance.checkOut = nowIST;
    await attendance.save();

    res.json(attendance);
};

export const getMyAttendance = async (req, res) => {
    const history = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
    res.json(history);
};

export const getAllAttendance = async (req, res) => {
    const history = await Attendance.find({}).populate('user', 'name email role').sort({ date: -1 });
    res.json(history);
};
