import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Employee from './models/Employee.js';
import { employees } from './data/mockData.js';

import User from './models/User.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        await Employee.deleteMany(); // Clear existing data
        await User.deleteMany();

        // Create Admin User
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@gdmr.com',
            password: 'password123',
            role: 'admin',
        });

        console.log(`Admin User Created: ${adminUser.email} / password123`);

        // Transform mock data to match schema if needed (e.g. rename id to _id or let mongo handle it)
        // Here we map to match the schema exactly if there are differences
        const sampleEmployees = employees.map(emp => ({
            name: emp.name,
            role: emp.role, // Ensure mockData has 'role' not 'position'
            department: emp.department,
            email: emp.email,
            status: emp.status,
            joinDate: emp.joinDate,
            salary: emp.salary,
            avatar: `https://ui-avatars.com/api/?name=${emp.name}&background=random`
        }));

        await Employee.insertMany(sampleEmployees);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
