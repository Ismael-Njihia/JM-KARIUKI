import { useSelector } from "react-redux"

const MyAppointments = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;

  return (
    <>
    <h1> {userId}</h1>
    </>
  )
}

export default MyAppointments