import Employee from '../models/Employee.js';

// Get all employees
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new employee
export const createEmployee = async (req, res) => {
    try {
        const { name, role, department, email } = req.body;

        const employee = new Employee({
            name,
            role,
            department,
            email,
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        });

        const createdEmployee = await employee.save();
        res.status(201).json(createdEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            employee.name = req.body.name || employee.name;
            employee.role = req.body.role || employee.role;
            employee.department = req.body.department || employee.department;
            employee.email = req.body.email || employee.email;
            employee.status = req.body.status || employee.status;

            const updatedEmployee = await employee.save();
            res.status(200).json(updatedEmployee);
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
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            await employee.deleteOne();
            res.status(200).json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
