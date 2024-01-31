import { useSelector } from "react-redux"

const Prescriptions = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;
    const firstName = userInfo.firstName;
  return (
    <>
    <p> Doctor {firstName}, Prescreptions</p>
    </>
  )
}

export default Prescriptions