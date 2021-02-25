import React, { Component } from 'react';

class Rating extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="rating">
                <span>
                    <i 
                        className={
                            this.props.rating >= 1 
                            ? "fa fa-star" 
                            : this.props.rating >= 0.5 
                            ? 'fa fa-star-half-o' 
                            : 'fa fa-star-o'
                        } 
                        aria-hidden="true"
                    ></i>
                </span>
                <span>
                    <i 
                        className={
                            this.props.rating >= 2 
                            ? "fa fa-star" 
                            : this.props.rating >= 1.5 
                            ? 'fa fa-star-half-o' 
                            : 'fa fa-star-o'
                        } 
                        aria-hidden="true"
                    ></i>
                </span>
                <span>
                    <i 
                        className={
                            this.props.rating >= 3
                            ? "fa fa-star" 
                            : this.props.rating >= 2.5 
                            ? 'fa fa-star-half-o' 
                            : 'fa fa-star-o'
                        } 
                        aria-hidden="true"
                    ></i>
                </span>
                <span>
                    <i 
                        className={
                            this.props.rating >= 4 
                            ? "fa fa-star" 
                            : this.props.rating >= 3.5 
                            ? 'fa fa-star-half-o' 
                            : 'fa fa-star-o'
                        } 
                        aria-hidden="true"
                    ></i>
                </span>
                <span>
                    <i 
                        className={
                            this.props.rating >= 5 
                            ? "fa fa-star" 
                            : this.props.rating >= 4.5 
                            ? 'fa fa-star-half-o' 
                            : 'fa fa-star-o'
                        } 
                        aria-hidden="true"
                    ></i>
                </span>
                <div className="reviews">{this.props.numReviews} reviews</div>
            </div>
        );
    }
}

export default Rating;