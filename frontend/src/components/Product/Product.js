import React from "react";
import { Link } from "react-router-dom";
import Rating from '../Rating/Rating';


function Product(props){
    return(     
        <div key={props._id} className="card">
            <Link to={`/product/${props.product._id}`}>
                <img 
                    className="medium" 
                    src={props.product.image} 
                    alt={props.product.name} 
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${props.product._id}`}>
                    <h2 className="c-white">{props.product.name}</h2>
                </Link>
                <Rating 
                    rating={props.product.rating} 
                    numReviews={props.product.numReviews} 
                />
                <div className="price">
                    PHP {props.product.price}
                </div>
            </div>
        </div>
    );
}

export default Product;
