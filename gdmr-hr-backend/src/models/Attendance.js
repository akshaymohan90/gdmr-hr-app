import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true
    },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-Day', 'Late', 'Irregular'],
        default: 'Absent'
    },
    remarks: { type: String }
}, { timestamps: true });

// Ensure one attendance record per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
