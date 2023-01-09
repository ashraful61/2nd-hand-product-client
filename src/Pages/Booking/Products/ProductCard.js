import React from "react";

const ProductCard = ({product}) => {

    const {name, price, location, image, conditionType, description, purchasedYear } = product
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{name}</h2>
        <p>Price:{price}</p>
        <p>Location: {location}</p>
        <p>Condition Type: {conditionType}</p>
        <p>Purchased Year:{purchasedYear}</p>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
