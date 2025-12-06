import Leave from '../models/Leave.js';
import User from '../models/User.js';

// Apply for Leave
export const applyLeave = async (req, res) => {
    const { type, startDate, endDate, reason } = req.body;

    try {
        const leave = await Leave.create({
            user: req.user._id,
            type,
            startDate,
            endDate,
            reason,
            status: 'Pending Manager'
        });
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Manager Approval
export const managerAction = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'Approve' or 'Reject'

    const leave = await Leave.findById(id).populate('user');
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    // Verify Manager (Simple check: is the requester the manager of the user?)
    // In a real app, strict hierarchy check needed. Here we check role.
    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only Managers can perform this action' });
    }

    leave.managerApproval = {
        status: action === 'Approve' ? 'Approved' : 'Rejected',
        updatedBy: req.user._id,
        updatedAt: new Date()
    };

    if (action === 'Approve') {
        leave.status = 'Pending Admin';
    } else {
        leave.status = 'Rejected';
    }

    await leave.save();
    res.json(leave);
};

// Admin Approval
export const adminAction = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'Approve' or 'Reject'

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    leave.adminApproval = {
        status: action === 'Approve' ? 'Approved' : 'Rejected',
        updatedBy: req.user._id,
        updatedAt: new Date()
    };

    if (action === 'Approve') {
        leave.status = 'Approved';
    } else {
        leave.status = 'Rejected';
    }

    await leave.save();
    res.json(leave);
};

// Get Leaves
export const getLeaves = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === 'admin') {
            // Admin sees all
        } else if (req.user.role === 'manager') {
            // Manager sees their team (For now, simplified to all or users with this manager)
            // Implementation: Find users where manager is me
            const teamMembers = await User.find({ manager: req.user._id }).select('_id');
            const teamIds = teamMembers.map(u => u._id);
            // Also see own leaves
            teamIds.push(req.user._id);
            query = { user: { $in: teamIds } };
        } else {
            // Employee sees own
            query = { user: req.user._id };
        }

        const leaves = await Leave.find(query)
            .populate('user', 'name email department')
            .sort({ createdAt: -1 });

        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
