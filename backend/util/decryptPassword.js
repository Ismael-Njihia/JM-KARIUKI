import bcryptjs from 'bcryptjs';

const decryptPassword = async (password, hashedPassword) => {
    const isMatch = await bcryptjs.compare(password, hashedPassword);
    return isMatch;
}

export default decryptPassword;