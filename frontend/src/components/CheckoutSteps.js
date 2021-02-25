import React from 'react'

function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active': ''}>
                LOG-IN
            </div>
            <div className={props.step2 ? 'active': ''}>
                SHIPPING
            </div>
            <div className={props.step3 ? 'active': ''}>
                PAYMENT
            </div>
            <div className={props.step4 ? 'active': ''}>
                PLACE ORDER
            </div>
        </div>
    )
}

export default CheckoutSteps;
