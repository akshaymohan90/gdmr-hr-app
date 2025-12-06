import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee'], // Added manager
        default: 'employee',
    },
    // New fields for unifying Employee + User
    department: { type: String, default: '' },
    position: { type: String, default: '' },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    salary: { type: Number, default: 0 }
}, {
    timestamps: true,
});

// Match user-entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
