import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../../../actions/ProductActions';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../../constants/ProductConstants';
import LoadingBox from '../../LoadingBox';
import MessageBox from '../../MessageBox';

export default function ProductListPage(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <br></br>
      <div >
        <h1 className="p-title">PRODUCTS</h1>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
            <div className="row f-98-percent">
              <h1>{''}</h1>
              <button type="button p-1" className="tertiary p-1" onClick={createHandler}>
                <i className="fa fa-plus"></i>
                {' '}Create Product
              </button>
            </div>
            <br></br>
            <table className="table f-98-percent m-auto">
                <thead className="bg-orange">
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <button
                        type="button"
                        className="small primary"
                        onClick={() =>
                            props.history.push(`/product/${product._id}/edit`)
                        }
                        >
                        <i className="fa fa-edit"></i>
                        {' '}{' '} Details
                        </button>
                        <button
                        type="button"
                        className="small secondary"
                        onClick={() => deleteHandler(product)}
                        >
                        <i className="fa fa-trash"></i>
                        {' '}{' '} Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}