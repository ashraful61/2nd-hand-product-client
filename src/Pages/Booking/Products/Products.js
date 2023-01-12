import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";
import ProductCard from "./ProductCard";

const Products = () => {

  const products = useLoaderData();
  const [bookingInfo, setBookingInfo] = useState(null)
  console.log(products);

  return (
    <div>
      {products.length !== 0 && (
        <h1 className="text-3xl my-8">
          All mobile for {products[0]?.product_category}
        </h1>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 && (
          <h1 className="text-3xl"> No product found for this category! </h1>
        )}
        {products.map((product) => (
          <ProductCard
           key={product._id} 
           product={product}
           setBookingInfo={setBookingInfo}
           ></ProductCard>
        ))}
      </div>
      {
          bookingInfo &&
          <BookingModal
          bookingInfo={bookingInfo}
          setBookingInfo={setBookingInfo}
        ></BookingModal>
      }
  
    </div>
  );
};

export default Products;
