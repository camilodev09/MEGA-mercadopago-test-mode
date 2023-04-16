import React from "react";
import data from "./data/products.json";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/TamboSlice";

import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = data.title;
  const idString = (id) => {
    return String(id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: data,
      },
    });
  };

  return (
    <div>
      <h1 className="bg-slate-600 text-white font-bold text-3xl p-4 rounded-md">
        Products Sale
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {data.map((data) => (
          <div key={data.id}>
            <div
              className="w-full h-40 md:h-96 cursor-pointer overflow-hidden  "
              onClick={handleDetails}
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 duration-500 rounded-md md:rounded-lg"
                src={data.img}
                alt="productImg"
              />
            </div>
            <div className="w-full h-20 border-[1px] px-2 py-1 md:py2  lgl:py-6">
              <div className="flex justify-between items-center">
                <div className="">
                  <h2 className=" font-titleFont text-xs md:text-base font-bold">
                    {data.title}
                  </h2>
                </div>
                <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
                  <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
                    <p className="font-semibold">${data.price}</p>
                  </div>
                  <p
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: data.id,
                          title: data.title,
                          img: data.img,
                          price: data.price,
                          quantity: 1,
                          description: data.description,
                          category: data.category,
                        })
                      )
                    }
                    className="absolute z-20 md:z-50  w-[50px] md:w-[70px] text-xs md:text-base  text-blue-900 hover:text-gray-900 flex items-center "
                  >
                    add{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
