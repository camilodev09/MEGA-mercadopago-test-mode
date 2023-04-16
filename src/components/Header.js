import React, { useState } from "react";
import { cart, mega, userpay } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  /*Show & Hidden Menu initial state = false then throught toogle it change  */
  const [showMenu, setShowMenu] = useState(false);
  /*Show & Hidden Menu initial state = false then throught toogle it change  */
  const productData = useSelector((state) => state.tambo.productData);
  const userInfo = useSelector((state) => state.tambo.userInfo);

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400  font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className="w-22 md:w-25 h-8 md:h-12" src={mega} alt="mega" />
          </div>
        </Link>
        <div className="flex  items-center gap-3 md:gap-8 ">
          <ul className=" hidden mdl:inline-flex items-center gap-6 lgl:gap-10">
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              <a href="/">Home</a>
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              <a href="/">About Us</a>
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              <a href="/Contact">Contact</a>
            </li>

            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              <a href="/Store">Store</a>
            </li>
          </ul>
          {/*MID  POSITION MENU */}
          <div className="flex gap-2 md:gap-5  mx-auto justify-between md:p-3">
            <Link to="/cart">
              <div className="relative">
                <img className="w-6" src={cart} alt="cartImg" />
                <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center  font-semibold font-titleFont">
                  {productData.length}
                </span>
              </div>
            </Link>
            <Link to={"./login"}>
              <img
                className="w-7 h-7 rounded-full"
                src={userInfo ? userInfo.img : userpay}
                alt="userLogo"
              />
            </Link>
            {userInfo && (
              <p className="text-xs md:text-base font-titleFont font-semibold underline underline-offset-2 pt-3">
                {userInfo.name}
              </p>
            )}
          </div>
          {/*MID POSITION MENU */}

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="text-xl mdl:hidden  w-10 h-12 inline-flex items-center  "
          >
            {showMenu ? <MdClose /> : <FiMenu />}
          </div>
          {showMenu && (
            <div className="w-[100%] h-screen m-0 overflow-scroll absolute  left-0 bg-slate-200 p-4 scrollbar-hide rounded-br-3xl top-20 ">
              <div className="flex flex-col gap-5 py-6 relative">
                <div>
                  <p className="text-sm text-black mt-2">
                    Whether with family or friends, you will always find
                    something for every occasion at MEGA. Visit us! Come we have
                    everything you need at incredible prices.
                  </p>
                </div>

                <ul className="flex flex-col gap-4">
                  <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                    <a href="/">Home</a>
                  </li>
                  <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                    <a href="/">About Us</a>
                  </li>
                  <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                    <a href="/">Contact</a>
                  </li>
                  <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                    <a href="/Store">Store</a>
                  </li>
                  <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                    <a href="/Login">Sign In</a>
                  </li>
                </ul>

                <div className="flex flex-col gap-4">
                  <h2 className="text-base uppercase font-titleFont mb-4">
                    Find me in
                  </h2>
                  <div className="flex gap-4">
                    <span className="bannerIcon">
                      <FaFacebookF />
                    </span>
                    <span className="bannerIcon">
                      <FaTwitter />
                    </span>
                    <span className="bannerIcon">
                      <FaLinkedinIn />
                    </span>
                  </div>
                </div>
                <div className="w-full p-0 ">
                  <div className=" bg-slate-300 mt-5 text-base w-50 h-10 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center  hover:border-blue-600 cursor-pointer duration-300">
                    <span className="text-sm text-gray-900">
                      {" "}
                      <a href="./Login"> Sign in and Enjoy!</a>
                    </span>
                  </div>

                  <div className="bg-slate-300  mt-1 text-base w-50 h-10 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center  hover:border-blue-600 cursor-pointer duration-300">
                    <span className="text-sm text-gray-900">
                      {" "}
                      <a href="./Store">Start Shopping Now!</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
