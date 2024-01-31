import { useSelector } from "react-redux"

const Patients = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
  return (
    <>
    <h1> All Patient </h1>
    <p> Doctor {firstName}, Patients</p>
    </>
  )
}

export default Patients