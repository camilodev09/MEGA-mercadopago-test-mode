import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/TamboSlice";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";

const Cartproducts = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.tambo.productData);

  return (
    <div className="w-[100%] lg:w-2/3  bg-gray-200 p-1 flex  flex-col gap-1">
      <div>
        <h2 className="font-titleFont text-2xl font-semibold">
          {" "}
          Shopping Cart
        </h2>
      </div>
      <div className="">
        {productData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center gap-1 md:gap-6 mt-6 "
          >
            <div>
              <MdOutlineClose
                onClick={() =>
                  dispatch(deleteItem(item.id)) &
                  toast.error(`${item.title} is removed`)
                }
                className="text-xs md:text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-12 md:w-32 h-12 md:h-32 object-cover"
                src={item.img}
                alt="productImg"
              />
            </div>
            <h2 className="w-20 md:w-40 text-xs md:text-1xl lg:text-2xl font-semibold lg:font-light">
              {item.title}
            </h2>
            <p className="w-10 md:w-14 text-xs md:text-sm">${item.price}</p>

            <div className="w-30 md:w-52 flex items-center justify-between text-gray-500 gap-2 md:gap-2border-1-white p-1 md:p-3">
              <p className="text-xs md:text-sm">Quantity</p>
              <div className="flex tems-center  gap-0 md:gap-4 text-sm font-semibold">
                <span
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        id: item.id,
                        title: item.title,
                        img: item.img,
                        price: item.price,
                        quantity: 1,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-300 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </span>
                {item.quantity}
                <span
                  onClick={() =>
                    dispatch(
                      incrementQuantity({
                        id: item.id,
                        title: item.title,
                        img: item.img,
                        price: item.price,
                        quantity: 1,
                      })
                    )
                  }
                  className="border h-5 font-normal text-xs md:text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </span>
              </div>
            </div>
            <p className="w-14">${item.quantity * item.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your Cart is Empty!")
        }
        className="text-xs md:text-sm bg-red-500 text-white mt-8  py-1 hover:bg-red-800 duration-300 rounded-md w-1/4 md:w-1/5"
      >
        Reset Cart
      </button>

      <Link to="/">
        <button className="mt-8  flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          let´s go buy!
        </button>
      </Link>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cartproducts;
