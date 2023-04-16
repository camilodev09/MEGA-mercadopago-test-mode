import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Cartproducts from "../CartProducts";

const Cart = () => {
  const productData = useSelector((state) => state.tambo.productData);
  const userInfo = useSelector((state) => state.tambo.userInfo);
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  return (
    <div>
      {productData.length > 0 ? (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <Cartproducts />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium ">cart totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, veritatis.
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>

            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-10 flex flex-col items-center gap-2 justify-center">
          <p className="text-xl text-orange-600 font-titleFont font-semibold">
            Your Cart is Empty. Please go back to Shopping and add products to
            Cart.
          </p>
          <Link to="/">
            <button className="flex items-center gap-1 text-gray-400 hover:text-black duration-300">
              <span>
                <HiOutlineArrowLeft />
              </span>
              go shopping
            </button>
          </Link>
        </div>
      )}
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

export default Cart;