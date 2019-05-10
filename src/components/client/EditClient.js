import React, { Component, Fragment } from 'react'
import { GET_CLIENT } from '../../queries'
import { Query } from 'react-apollo'
import FormClient from './FormClient'
import Loader from '../loader/Loader';

class EditClient extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <Fragment>
                <h2 className="text-primary text-center display-4">Edit Client</h2>
                <Query query={GET_CLIENT} variables={{id}}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <Loader/>
                        if (error) return `Error: ${error}`
                        let client = data.getClient
                        return <FormClient client={client} refetch={refetch}/>
                    }}
                </Query>
                
            </Fragment>
        )
    }
}

export default EditClient