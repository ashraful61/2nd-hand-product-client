import React from 'react';
import mobile from '../../../assets/images/mobile.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={mobile} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Sell Your Used Product!</h1>
                    <p className="py-6">
                        Used mobile shop is an e-commerce organization, Its for second-hand products has been on the rise for a number of years now.
                    </p>
                    <PrimaryButton>Getting Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;