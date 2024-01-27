const randomGenerator = () =>{
    const randomNumbers = Math.floor(Date.now() / 1000);
    return randomNumbers;
}

export default randomGenerator;