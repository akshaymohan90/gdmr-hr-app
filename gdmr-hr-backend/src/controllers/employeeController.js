import User from '../models/User.js';

// Get all employees (users who are not just pure admins, or all users)
export const getEmployees = async (req, res) => {
    try {
        // Fetch all users, populate manager name
        const employees = await User.find({}).select('-password').populate('manager', 'name');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select('-password').populate('manager', 'name');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new employee (User)
export const createEmployee = async (req, res) => {
    try {
        const { name, email, password, role, department, position, manager } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password, // Password will be hashed by pre-save hook in User model
            role: role || 'employee',
            department,
            position,
            manager: manager || null
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.department = req.body.department || user.department;
            user.position = req.body.position || user.position;
            user.manager = req.body.manager || user.manager;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            // Return without password
            const response = updatedUser.toObject();
            delete response.password;

            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
