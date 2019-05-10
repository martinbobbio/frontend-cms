import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_TOP_CLIENTS } from '../../queries';
import Loader from '../loader/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const GraphicClient = () => (
    <Query query={GET_TOP_CLIENTS}>
        {({loading, error, data}) => {
            if(loading) return <Loader/>
            if(error) return error
            const topClients = []
            data.getTopClients.map((order, index) => (
                topClients[index] = {
                    total:order.total,
                    ...order.client[0]
                }
            ))
            return(
                <Fragment>
                    <h2 className="text-primary display-5 ml-4 mb-5">Top {topClients.length} Clients</h2>
                    <BarChart width={1000} height={300} data={topClients} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="total" fill="#8884d8"/>
                    </BarChart>
                </Fragment>
            )
        }}
    </Query>
);

export default GraphicClient;