import React, { Component } from 'react';

class MessageBox extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={`f-90-percent m-auto alert alert-${this.props.variant || 'info f-90-percent m-auto '}`}>
                    {this.props.children}
                </div>
                <br></br>
            </div>
        );
    }
}


export default MessageBox;