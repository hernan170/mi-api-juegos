import bcrypt from 'bcrypt';

export const createHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const isValidPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
