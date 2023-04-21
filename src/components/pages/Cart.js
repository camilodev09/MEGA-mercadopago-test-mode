import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Cartproducts from "../CartProducts";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  /* HANDLECHECKOUT */

  /* HANDLECHECKOUT */
  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };
  /* CHECKOUT paypal LOGIC linked setAmount */
  const items = productData.map((item) => {
    return {
      name: item.title,
      quantity: item.quantity,
      description: item.description,
      value: item.price.toFixed(2),
    };
  });

  /* CREATE ORDER paypal LOGIC linked setAmount */
  const createOrder = (data, actions) => {
    console.log(items); // Agregar esta línea
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmt,
          },
          item: items,
        },
      ],
    });
  };
  /* ONAPROVE paypal LOGIC linked setAmount */
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setPayNow(false);
      toast.success("Payment Successful!");
    });
  };
  /* ONAERROR paypal LOGIC linked setAmount */
  // eslint-disable-next-line no-unused-vars
  const onError = (err) => {
    console.log(err);
    toast.error("An error occurred while processing payment");
  };

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
            {/*PAY NOW BUTTON  HERE AGREE PAY PAL*/}
            <button
              onClick={handleCheckout}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300 rounded-md"
            >
              proceed to checkout
            </button>
            {/*PAY NOW BUTTON */}
            {/*then WE VERIFY WITH STATE PAYNOW */}
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AU8HMmXo4qv0YcKxr2UTFAhWprICD_15NzA5ulRq776CeXLqmPLSfkN_oUXgfrOAFner3RsgWGghR7QT",
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={(error) => console.error(error)}
                  />
                </PayPalScriptProvider>
              </div>
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
