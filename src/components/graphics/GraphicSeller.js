import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_TOP_SELLERS } from '../../queries';
import Loader from '../loader/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const GraphicSeller = () => (
    <Query query={GET_TOP_SELLERS}>
        {({loading, error, data}) => {
            if(loading) return <Loader/>
            if(error) return error
            const topSellers = []
            data.getTopSellers.map((seller, index) => (
                topSellers[index] = {
                    total:seller.total,
                    ...seller.seller[0]
                }
            ))
            return(
                <Fragment>
                    <h2 className="text-primary display-5 ml-4 mb-5">Top {topSellers.length} Sellers</h2>
                    <BarChart width={1000} height={300} data={topSellers} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="total" fill="#10a98b"/>
                    </BarChart>
                </Fragment>
            )
        }}
    </Query>
);

export default GraphicSeller;