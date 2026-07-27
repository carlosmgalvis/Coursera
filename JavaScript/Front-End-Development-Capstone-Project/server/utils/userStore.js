const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { isMongoConnected } = require('../db');

const dataFilePath = path.join(__dirname, '..', 'data', 'users.json');

const ensureDataFile = async () => {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

    try {
        await fs.access(dataFilePath);
    } catch {
        await fs.writeFile(dataFilePath, '[]', 'utf8');
    }
};

const readUsers = async () => {
    await ensureDataFile();
    const raw = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(raw);
};

const writeUsers = async (users) => {
    await ensureDataFile();
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
};

const toPlainUser = (user) => {
    if (!user) {
        return null;
    }

    if (typeof user.toObject === 'function') {
        const obj = user.toObject();
        return {
            ...obj,
            id: obj._id?.toString() || obj.id,
        };
    }

    return user;
};

const findUserByEmail = async (email) => {
    if (isMongoConnected()) {
        try {
            const user = await User.findOne({ email });
            return toPlainUser(user);
        } catch (error) {
            console.error('Mongo findUserByEmail failed, falling back to file store.', error);
        }
    }

    const users = await readUsers();
    return users.find((user) => user.email === email) || null;
};

const createUser = async (userData) => {
    if (isMongoConnected()) {
        try {
            const user = await User.create(userData);
            return toPlainUser(user);
        } catch (error) {
            console.error('Mongo createUser failed, falling back to file store.', error);
        }
    }

    const users = await readUsers();
    const newUser = {
        id: uuidv4(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);
    return newUser;
};

const updateUserByEmail = async (email, updates) => {
    if (isMongoConnected()) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { email },
                {
                    $set: {
                        ...updates,
                        updatedAt: new Date(),
                    },
                },
                { new: true }
            );

            return toPlainUser(updatedUser);
        } catch (error) {
            console.error('Mongo updateUserByEmail failed, falling back to file store.', error);
        }
    }

    const users = await readUsers();
    const index = users.findIndex((user) => user.email === email);

    if (index === -1) {
        return null;
    }

    users[index] = {
        ...users[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    await writeUsers(users);
    return users[index];
};

module.exports = {
    createUser,
    findUserByEmail,
    updateUserByEmail,
};
