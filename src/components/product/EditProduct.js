import React, { Component, Fragment } from 'react'
import { GET_PRODUCT } from '../../queries'
import { Query } from 'react-apollo'
import FormProduct from './FormProduct'
import Loader from '../loader/Loader';

class EditProduct extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <Fragment>
                <h2 className="text-primary text-center display-4">Edit Client</h2>
                <Query query={GET_PRODUCT} variables={{id}}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <Loader/>
                        if (error) return `Error: ${error}`
                        let product = data.getProduct
                        return <FormProduct product={product} refetch={refetch}/>
                    }}
                </Query>
                
            </Fragment>
        )
    }
}

export default EditProduct