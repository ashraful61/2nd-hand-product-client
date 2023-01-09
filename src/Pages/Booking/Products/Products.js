import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Products = () => {

    const products = useLoaderData();
    console.log(products);

    return (
        <div>
            {
                products.length !== 0 && <h1 className='text-3xl my-8'>All mobile for {products[0]?.product_category}</h1>
            }
            
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.length === 0 && <h1 className='text-3xl'> No product found for this category! </h1>
                }
            {
                products.map(product => 
                    <ProductCard key={product._id} product={product}>
                    </ProductCard>
                )
            }
            </div>
          
        </div>
    );
};

export default Products;