import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaCheckSquare } from 'react-icons/fa';
const ProductCard = ({ product, setBookingInfo, fromAdvertised }) => {
  const {
    name,
    originalPrice,
    resalePrice,
    postedDate,
    sellerName,
    yearsOfUse,
    location,
    image,
    conditionType,
    description,
    purchasedYear,
    sellStatus,
    email,
  } = product;

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`https://used-product-server-six.vercel.app/users/isVerified/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsVerified(data.isVerified);
        });
    }
  }, [email]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>Original Price: </strong>
          {originalPrice}
        </p>
        <p>
          <strong>Resale Price: </strong>
          {resalePrice}
        </p>
        <p>
          <strong>Yeas of Used: </strong>
          {yearsOfUse}
        </p>
        <p className="flex">
          {isVerified && <FaCheckSquare className="h-5 w-5 text-green-600" />} <strong>Seller Name: </strong>
          {sellerName}
        </p>
        <p>
          <strong>Email: </strong>
          {email}
        </p>
        <p>
          <strong>Location: </strong> {location}
        </p>
        <p>
          <strong>Condition Type: </strong> {conditionType}
        </p>
        <p>
          <strong>Purchased Year: </strong>
          {purchasedYear}
        </p>
        <p>
          <strong>In stock: </strong>
          <span className={`${sellStatus === "sold" && "text-red-500"}`}>
            {sellStatus}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          {moment(postedDate).utc().format("YYYY-MM-DD")}
        </p>

        <p>
          <strong>Description:</strong>
          {description}
        </p>
        {fromAdvertised ||
          (sellStatus === "available" && (
            <div className="card-actions">
              <label
                // disabled={slots.length === 0}
                htmlFor="booking-modal"
                className="btn btn-primary text-white"
                onClick={() => setBookingInfo(product)}
              >
                Buy Now
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
