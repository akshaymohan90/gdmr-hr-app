import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import User from './src/models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Middleware
app.use(cors({
    origin: ['https://gdmr.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' })); // Limit body size

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('GDMR HR API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Auto-seed Admin User
const ensureAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@gdmr.com' });
        if (!adminExists) {
            console.log('Seeding Admin User...');
            await User.create({
                name: 'Admin User',
                email: 'admin@gdmr.com',
                password: 'password123',
                role: 'admin',
            });
            console.log('Admin User Created');
        } else {
            console.log('Admin User already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

// Start server
const startServer = async () => {
    try {
        await connectDB();
        await ensureAdminUser();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
