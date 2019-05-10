import React, { Component, Fragment } from 'react'
import FormProduct from './FormProduct';

class NewProduct extends Component {

    render() {
        return (
            <Fragment>
                <h2 className="text-success text-center display-4">New Product</h2>
                <FormProduct/>
            </Fragment>
        )
    }
}

export default NewProduct