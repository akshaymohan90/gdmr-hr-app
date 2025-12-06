import mongoose from 'mongoose';

const leaveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Unpaid Leave'],
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },

    // Approval Flow
    managerApproval: {
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date }
    },
    adminApproval: {
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date }
    },

    // Final consolidated status
    status: {
        type: String,
        enum: ['Pending Manager', 'Pending Admin', 'Approved', 'Rejected'],
        default: 'Pending Manager'
    }
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
