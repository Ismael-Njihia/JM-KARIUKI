import { useSelector } from "react-redux"
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { FaUserMd, FaUser, FaUserShield } from 'react-icons/fa';

const Profile = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  const { data: users, isLoading } = useGetUsersQuery();

  // Find the user details for the current user
  const currentUser = users?.find(user => user.userId === userId);

  // Determine the avatar icon based on userType
  let AvatarIcon;
  switch (currentUser?.userType) {
      case 'doctor':
          AvatarIcon = FaUserMd;
          break;
      case 'patient':
          AvatarIcon = FaUser;
          break;
      case 'admin':
          AvatarIcon = FaUserShield;
          break;
      default:
          AvatarIcon = null;
  }

  return (
      <>
          <h1>{userId}</h1>
          <p>Profile</p>
          {currentUser && (
              <div>
                  {AvatarIcon && <AvatarIcon size={50} />}
                  <p>Email: {currentUser.email}</p>
                  <p>First Name: {currentUser.firstName}</p>
                  <p>Last Name: {currentUser.lastName}</p>
                  <p>User Type: {currentUser.userType}</p>
              </div>
          )}
      </>
  );
};


export default Profile