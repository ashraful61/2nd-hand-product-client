import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import ProductCategoryCard from './ProductCategoriesCard';

const ProductCategories = () => {

    const { data: productCategories, isLoading } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/productCategories");
          const data = await res.json();
          return data;
        },
      });

      if(isLoading) {
        return <Loading></Loading>
      }

    return (
        <>
        <h3 className='text-4xl my-5 mt-20'>Product Categories</h3>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
       
            {
                productCategories.map(pc => <ProductCategoryCard
                    key={pc._id}
                    card={pc}
                ></ProductCategoryCard>)
            }
        </div>
        </>
    );
};

export default ProductCategories;