import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
    },
    designation: {
        type: String,
        required: [true, "Please provide a designation."],
    },
    department: {
        type: String,
        required: [true, "Please provide department."],
    },
    address: {
        type: String,
        required: [true, "Please provide and address."],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title.'],
    },
    description: {
        type: String,
        required: [true, 'Please provide the description.'],
    },
    employeeList: {
        type: String,
        required: [true, 'Please provide an employee name.'],
    },
    assignDate: {
        type: Date,
        required: [true, 'Please provide a date.'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Please provide the end date.'],
    },
    priority: {
        type: String,
        required: [true, 'Please provide the priority.'],
    },
    status: {
        type: String,
        default: 'assigned',
    },
    remarks: {
        type: String,
        default: null,
    }
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

export const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);