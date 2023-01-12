import React from 'react';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';
// import Services from '../Services/Services';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <ProductCategories></ProductCategories>
            {/* <Services></Services> */}
        </div>
    );
};

export default Home;