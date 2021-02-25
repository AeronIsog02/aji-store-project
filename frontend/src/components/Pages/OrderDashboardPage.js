import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrderUser } from '../../actions/OrderActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

export default function OrderDashboardPage(props) {

    const orderUserList = useSelector( state => state.orderUserList );
    const { loading, error, orders } = orderUserList;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listOrderUser());
    }, [dispatch]);
    
    return (
        <div>
            <br />
            <div>
                <h1 className="p-title">ORDER HISTORY</h1>
            </div>
            <br></br>   
            { loading ? 
                <LoadingBox></LoadingBox>
                : error? 
                <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    
                    <table className="table f-98-percent m-auto">
                        <thead className="bg-orange">
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt && order.createdAt.substr(0,10)}</td>
                                        <td>PHP {' '}{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt && order.paidAt.substr(0,10): 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substr(0,10): 'No'}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="small primary" 
                                                onClick={ () => {
                                                        props.history.push(`/order/${order._id}`);
                                                    }
                                                }>
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
