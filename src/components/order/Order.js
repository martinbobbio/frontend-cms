import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { GET_PRODUCT } from '../../queries';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify'
import { UPDATE_ORDER } from '../../mutations';

const Order = props => {
    const order = props.order
    const date = new Date(Number(order.date))
    
    const changeOrder = (e, method) => {
        const status = e.target.value
        const { id, date, total, client } = order
        const input = { id, status, order:order.order, date, total, client }
        method({ variables: { input } })
        toast.success("THE ORDER STATUS WAS UPDATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
    }

    let statusClass
    switch(order.status){
        case 'PENDING': statusClass = "border-light"; break;
        case 'COMPLETED': statusClass = "border-success"; break;
        case 'CANCELED': statusClass = "border-danger"; break;
        default:
    }

    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${statusClass}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Status:
                        <Mutation mutation={UPDATE_ORDER}>
                            {updateOrder=> (
                                <select onChange={e => changeOrder(e, updateOrder)} className="form-control my-3" defaultValue={order.status}>
                                    {order.status === "PENDING" && 
                                        <option value="PENDING">PENDING</option>
                                    }
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="CANCELED">CANCELED</option>
                                </select>
                            )}
                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Order ID:
                        <span className="font-weight-normal"> {order.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Date: 
                        <span className="font-weight-normal"> {date.toLocaleString("es-AR")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal"> $  {order.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Products</h3>
                    { order.order.map(product => {
                        const { id } = product
                        return(
                            <Query key={product.id} query={GET_PRODUCT} variables={{id}}>
                            {({ loading, error, data}) => {
                                if(loading) return <Loader/>
                                if(error) return error
                                const item = data.getProduct
                                return(
                                    <Fragment>
                                        <div className="border mb-4 p-4">
                                            <p className="card-text">
                                                <span className="bold">Name: </span> {item.name}
                                            </p>
                                            <p className="card-text">
                                                <span className="bold">Count: </span> {product.count}
                                            </p>
                                            <p className="card-text">
                                                <span className="bold">Price: </span> {item.price}
                                            </p>
                                        </div>
                                    </Fragment>
                                )
                            }}
                            </Query>
                        )
                    }) }
                </div>
            </div>
        </div>
    );
}

export default Order;