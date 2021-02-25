import React, { Component } from 'react';

class LoadingBox extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading">
                <i className="fa fa-spinner fa-spin"></i> Loading....
            </div>
        );
    }
}


export default LoadingBox;