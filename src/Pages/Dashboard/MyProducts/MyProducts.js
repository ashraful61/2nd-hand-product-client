import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);
    const navigate = useNavigate();
    const closeModal = () => {
        setDeletingProduct(null);
    }


    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/products', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessTokenUseProduct')}`
                    }
                });
                const data = await res.json();
                console.log(data)
                return data;
            }
            catch (error) {

            }
        }
    });

    
    const handleDeleteProduct = product => {
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessTokenUseProduct')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Product ${product.name} deleted successfully`)
            }
        })
    }

    const handleAdvertisePopup = (product) => {
        Swal.fire({
            title: 'Do you want to advertised it?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
                handleAdvertise(product)
            }
          })
    }

    const handleAdvertise = (product) => {
        fetch(`http://localhost:5000/products/advertise/${product?._id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "accessTokenUseProduct"
              )}`,
            },
            // body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              Swal.fire(
                'Success!',
                'Advertised successfully',
                'success'
              ).then(result=>{
                if(result.isConfirmed){
                    navigate("/advertisedItems");
                }
              })
            //   toast.success(`Advertised successfully`);
         
            });
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-3xl mb-3">My products: {products?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Resale Price</th>
                            <th>Category</th>
                            <th>Condition Type</th>
                            <th>Purchase Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="w-24 rounded-full">
                                        <img src={product.image} alt="" />
                                    </div>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.resalePrice}</td>
                                <td>{product.product_category}</td>
                                <td>{product.conditionType}</td>
                                <td>{product.purchasedYear}</td>
                                <td>
                                    <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label> &nbsp;
                                   {product?.isAdvertised || <button onClick={() => handleAdvertisePopup(product)} className="btn btn-sm btn-info">Advertise</button> }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.name}. It cannot be undone.`}
                    successAction = {handleDeleteProduct}
                    successButtonName="Delete"
                    modalData = {deletingProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;