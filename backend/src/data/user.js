import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('Thevu2602@', 10),
        isAdmin: true,
    },
    {
        name: 'User',
        email: 'user@example.com',
        password: bcrypt.hashSync('Thevu2602@', 10),
        isAdmin: false,
    },
];
export default users;
