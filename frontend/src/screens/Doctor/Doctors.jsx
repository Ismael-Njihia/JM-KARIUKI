import { useSelector } from "react-redux"

const Doctors = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
  return (
    <>
    <h1> {userId}</h1>
    <p> All Doctors</p>
    </>
  )
}

export default Doctors