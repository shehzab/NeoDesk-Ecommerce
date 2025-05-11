import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Update Profile</h2>
        
        {loadingUpdateProfile ? (
          <div className="flex justify-center my-8">
            <Loader />
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                My Orders
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;