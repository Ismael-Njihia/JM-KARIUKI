import { useSelector } from "react-redux"

const Profile = () => {
    const {userInfo} = useSelector(state => state.auth)
    const userId = userInfo.userId;
  return (
    <>
    <h1> {userId}</h1>
    <p>Profile</p>
    </>
  )
}

export default Profile