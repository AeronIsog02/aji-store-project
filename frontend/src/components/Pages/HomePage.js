import React, { useEffect } from 'react';
import Product from "../Product/Product";
import MessageBox from '../MessageBox';
import LoadingBox from '../LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/ProductActions';
import Slider from '../Slider';

export default function HomePage() {
    
    const dispatch = useDispatch();
    const productList = useSelector( (state) => state.productList);
    const {loading , error , products } = productList; 

    useEffect(() => {

        dispatch(listProducts());

    }, [dispatch]);

    return (
        <div>
            <Slider></Slider>
            {loading ? <LoadingBox></LoadingBox>
            :error ? <MessageBox variant="danger" >{error}</MessageBox>
            :
            <div className="row center">
                { products.map( product => ( <Product key={product._id} product={product} />))}
            </div>
            }
        </div>
    );
}

