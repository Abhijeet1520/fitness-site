import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUserDetail, updateUser, deleteUser, logout } from '../../services/apiService';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { User } from '@services/interfaces';
import { useAuth } from '../../contexts/authContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({});
  const { setUserLoggedIn } = useAuth();
  const [resettingPassword, setResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await fetchCurrentUserDetail();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (currentUser) {
      await deleteUser(currentUser.id);
      setUserLoggedIn(false);
      navigate('/register');
    }
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSetPassword = async () => {
    if (currentUser && newPassword) {
      try {
        setResettingPassword(false);
        setNewPassword('');
        await updateUser( currentUser.id, { password: newPassword });
      } catch (error) {
        console.error('Error updating password:', error);
      }
    }
  };

  if (loading) {
    return <p className="mt-10">Loading...</p>;
  }

  if (!currentUser) {
    return <p className="mt-10">User not found</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="card flex flex-col justify-center items-center bg-stone-100 p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="self-center w-full">
          <h2 className="text-lg font-medium mb-3">
            <strong>Username: </strong>
            {currentUser.username}
          </h2>
        </div>
        {resettingPassword && (
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter new password"
          />
        )}
        <button
          onClick={resettingPassword ? handleSetPassword : () => setResettingPassword(true)}
          className={`btn text-white text-sm w-full my-5 ${resettingPassword ? 'bg-blue-500' : 'bg-green-500'} border-none`}
        >
          {resettingPassword ? 'Save Password' : 'Reset Password'}
        </button>
        <button onClick={handleLogout} className="btn bg-black text-white text-sm w-full my-5">
          Logout <IoLogOutOutline />
        </button>
        <hr className="w-full my-4" />
        <button onClick={handleDeleteAccount} className="btn bg-red-500 hover:bg-red-600 text-white text-sm w-full my-5">
          Delete Account <MdOutlineDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default Profile;
