import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  const imageHostKey = process.env.REACT_APP_img_bb_key;

  const navigate = useNavigate();

  const { data: productCategories, isLoading } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/productCategories");
      const data = await res.json();
      return data;
    },
  });

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const product = {
            name: data.name,
            price: data.price,
            location: data.location,
            image: imgData.data.url,
            number: data.number,
            conditionType: data.conditionType,
            description: data.description,
            product_category: data.product_category,
            purchasedYear: data.purchasedYear,
            originalPrice: data.originalPrice,
            resalePrice: data.resalePrice,
            yearsOfUse: data.yearsOfUse,
            sellerName: user?.displayName,
            postedDate: new Date(),
            email: user?.email
          };

          // save product information to the database
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "accessTokenUseProduct"
              )}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/myProducts");
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full p-7">
      <h2 className="text-4xl">Add A Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>

        <div className="grid grid-cols-2 gap-2">
 

        {/* Name label */}
        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="number"
            {...register("originalPrice", {
              required: "Original Price is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.originalPrice && (
            <p className="text-red-500">{errors.originalPrice.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="number"
            {...register("resalePrice", {
              required: "Resale Price is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.resalePrice && (
            <p className="text-red-500">{errors.resalePrice.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Years of Use</span>
          </label>
          <input
            type="text"
            {...register("yearsOfUse", {
              required: "Year is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.yearsOfUse && (
            <p className="text-red-500">{errors.yearsOfUse.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("location", {
              required: "Location is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Mobile Number</span>
          </label>
          <input
            type="number"
            {...register("number", {
              required: "Mobile Number is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.number && (
            <p className="text-red-500">{errors.number.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Condition Type</span>
          </label>
          <select
            {...register("conditionType")}
            className="select input-bordered w-full "
          >
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            {...register("description", {
              required: "Description is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Product Category</span>
          </label>
          <select
            {...register("product_category")}
            className="select input-bordered w-full "
          >
            {productCategories.map((product_category) => (
              <option key={product_category._id} value={product_category.name}>
                {product_category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Purchase Year</span>
          </label>
          <input
            type="number"
            {...register("purchasedYear", {
              required: "Purchase Year is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.purchasedYear && (
            <p className="text-red-500">{errors.purchasedYear.message}</p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            {" "}
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Photo is Required",
            })}
            className="input input-bordered w-full "
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        </div>
        <input
          className="btn btn-accent mt-4"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

/**
 * Three places to store images
 * 1. Third party image hosting server
 * 2. File system of your server
 * 3. mongodb (database)
 */

export default AddProduct;
