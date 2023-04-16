import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { facebook, googleLogo } from "../../assets/index";
import { useNavigate } from "react-router-dom";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../redux/TamboSlice";

const Login = () => {
  const userInfo = useSelector((state) => state.tambo.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //sign out client
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 md:gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-2 ">
        <div
          onClick={handleLogin}
          className="pl-2 text-base  w-60  h-10 md:h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-start gap-2   hover:border-blue-600 cursor-pointer duration-300"
        >
          <img className="w-8" src={googleLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900"> Sign in with Google </span>
        </div>

        {userInfo && (
          <button
            onClick={handleSignOut}
            className=" bg-black text-white text-xs md:text-base py-2 md:py-3 px-4 md:px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <div className="pl-2 text-base w-60 h-10 md:h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-start gap-2 hover:border-blue-600 cursor-pointer duration-300">
          <img className="w-8" src={facebook} alt="facebook" />
          <span className="text-sm text-gray-900"> Sign in with Facebook</span>
        </div>

        {userInfo && (
          <button
            onClick={handleSignOut}
            className="bg-black text-white text-xs md:text-base py-2 md:py-3 px-4 md:px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
