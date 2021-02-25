import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderListPage from "./components/Pages/Admin/OrderListPage";
import ProductEditPage from "./components/Pages/Admin/ProductEditPage";
import ProductListPage from "./components/Pages/Admin/ProductListPage";
import CartPage from "./components/Pages/CartPage";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import OrderDashboardPage from "./components/Pages/OrderDashboardPage";
import OrderPage from "./components/Pages/OrderPage";
import PaymentPage from "./components/Pages/PaymentPage";
import PlaceOrderPage from "./components/Pages/PlaceOrderPage";
import ProductPage from "./components/Pages/ProductPage";
import ProfilePage from "./components/Pages/ProfilePage";
import RegisterPage from "./components/Pages/RegisterPage";
import ShippingPage from "./components/Pages/ShippingPage";
import PrivateRoute from "./components/PrivateRoute";


function App() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    return(
        <BrowserRouter> 
            <div className="grid-container">
                <Header cartItems={cartItems}/>
                <main>
                    <Route path="/cart/:id?" component={CartPage} exact></Route>
                    <Route path="/product/:id" component={ProductPage} exact></Route>
                    <Route path="/product/:id/edit" component={ProductEditPage} exact></Route>
                    <Route path="/" component={HomePage} exact></Route>
                    <Route path="/login" component={LoginPage} exact></Route>
                    <Route path="/register" component={RegisterPage} exact></Route>
                    <Route path="/shipping" component={ShippingPage} exact></Route>
                    <Route path="/payment" component={PaymentPage} exact></Route>
                    <Route path="/placeorder" component={PlaceOrderPage} exact></Route>
                    <Route path="/orderhistory" component={OrderDashboardPage} exact></Route>
                    <Route path="/order/:id" component={OrderPage} exact></Route>
                    <PrivateRoute path="/profile" component={ProfilePage} exact></PrivateRoute>
                    <AdminRoute path="/productlist" component={ProductListPage} exact></AdminRoute>
                    <AdminRoute path="/orderlist" component={OrderListPage} ></AdminRoute>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
