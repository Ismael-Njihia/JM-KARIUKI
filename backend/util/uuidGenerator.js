import { v4 as uuidv4 } from 'uuid';
const uuidGenerator = () => {
    return uuidv4().replace(/-/g, "");
};

export default uuidGenerator;