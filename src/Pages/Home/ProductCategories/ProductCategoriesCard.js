import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategoryCard = ({ card }) => {
    const { name } = card;
    return (
         <Link to={`category/${name}`}>
            <div className={`card p-6 md:card-side shadow-xl border-2`}>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
            </div>
        </div>
         </Link>
    );
};

export default ProductCategoryCard;