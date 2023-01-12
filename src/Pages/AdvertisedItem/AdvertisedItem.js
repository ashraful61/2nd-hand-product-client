import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import ProductCard from "../Booking/Products/ProductCard";
import Loading from "../Shared/Loading/Loading";

const AdvertisedItem = () => {
  const { user } = useContext(AuthContext);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products/advertise", user?.email],
    queryFn: async () => {
      try {
        console.log(user);
        const res = await fetch(
          `http://localhost:5000/products/advertise/${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem(
                "accessTokenUseProduct"
              )}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-4xl mt-4 mb-8">
        {" "}
        Advertised Items: {products?.length}
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 && (
          <h1 className="text-3xl"> No product found for this category! </h1>
        )}
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            fromAdvertised={true}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedItem;
