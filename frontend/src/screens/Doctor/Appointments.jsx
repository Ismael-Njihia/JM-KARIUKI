import { useSelector } from "react-redux"

const Appointments = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
  return (
    <>
    <h1> {userId}</h1>
    <p> Doctor {firstName}, Appointments</p>
    </>
  )
}

export default Appointments