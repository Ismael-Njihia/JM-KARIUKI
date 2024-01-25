import bcryptjs from 'bcryptjs';

const encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}

export default encryptPassword;