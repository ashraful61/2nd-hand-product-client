import React from "react";
import moment from "moment";

const ProductCard = ({ product, setBookingInfo }) => {
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
  } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>Original Price:</strong>
          {originalPrice}
        </p>
        <p>
          <strong>Resale Price:</strong>
          {resalePrice}
        </p>
        <p>
          <strong>Yeas of Used:</strong>
          {yearsOfUse}
        </p>
        <p>
          <strong>Seller Name:</strong>
          {sellerName}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Condition Type:</strong> {conditionType}
        </p>
        <p>
          <strong>Purchased Year:</strong>
          {purchasedYear}
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          {moment(postedDate).utc().format("YYYY-MM-DD")}
        </p>

        <p>{description}</p>
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
      </div>
    </div>
  );
};

export default ProductCard;
