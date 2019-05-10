import React, { Fragment } from 'react'
import { Query } from 'react-apollo';
import { GET_ORDERS, GET_CLIENT } from '../../queries';
import Loader from '../loader/Loader';
import Order from './Order';

const OrderClient = (props) => {
    const client = props.match.params.id
    return (
        <Fragment>
            <Query query={GET_CLIENT} variables={{ id:client }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loader/>
                    if (error) return error
                    const { name, surname } = data.getClient
                    return (
                        <h2 className="text-success text-center display-4 mb-5">Orders - {name} {surname}</h2>
                    )
                }}
            </Query>
            <div className="row">
                <Query query={GET_ORDERS} variables={{ client }} pollInterval={500}>
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return <Loader/>
                        if (error) return error
                        let orders = data.getOrders
                        return (
                            orders.map(order => (
                                <Order key={order.id} order={order} client={client} />
                            ))
                        )
                    }}
                </Query>
            </div>
        </Fragment>
    );
}

export default OrderClient;