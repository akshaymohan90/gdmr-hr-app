import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Terminated'],
        default: 'Active',
    },
    joinDate: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
