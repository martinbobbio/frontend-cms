import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_CLIENT, GET_PRODUCTS } from '../../queries'
import Loader from '../loader/Loader'
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import { NEW_ORDER } from '../../mutations'
import { toast } from 'react-toastify'


class NewOrder extends Component {

    state = { products: [], total: 0 }

    changeProducts = products => {
        let { total } = this.state
        if(products.length !== 0){
            products[products.length - 1].count = 1
            products.map(product => total += (product.count * product.price))
        }else total = 0
        this.setState({ products, total })
    }

    changeCounts = (e, index) => {
        const { products } = this.state
        let total = 0
        if (products.length === 0) {
            this.setState({ total })
            return
        }
        if(e.target.value > products[index].stock) e.target.value = products[index].stock
        if(e.target.value < 0) e.target.value = 1
        

        products[index].count = Number(e.target.value)
        products.map(product => total += (product.count * product.price))
        this.setState({ products, total })
    }

    deleteProduct = (id, index) => {
        let { products, total } = this.state
        total -= products[index].count * products[index].price
        products = products.filter(product => product.id !== id)
        this.setState({ products, total })
    }

    generateOrder = method =>{
        const { products, total } = this.state
        const { id } = this.props.match.params
        const orderInput = products.map(({ name, price, stock, ...object}) => object)

        const input = { order: orderInput, total, client:id }
        method({ variables: { input } })
        toast.success("THE ORDER WAS GENERATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
        this.props.history.push(`/orders/${id}`)
    }

    render() {
        const { id } = this.props.match.params
        return (
            <Fragment>
                <h2 className="text-success text-center display-4 mb-5">New Order</h2>
                <div className="row">
                    <div className="col-md-3">
                        <h2 className="text-center mb-5">Client summary</h2>
                        <Query query={GET_CLIENT} variables={{ id }} pollInterval={500}>
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if (loading) return <Loader />
                                if (error) return error
                                const { name, surname, age, emails, company, type } = data.getClient
                                return (
                                    <ul className="list-unstyled my-5">
                                        <li className="border p-2">
                                            <span className="bold">Name: </span> {name}
                                        </li>
                                        <li className="border p-2">
                                            <span className="bold">Surname: </span> {surname}
                                        </li>
                                        <li className="border p-2">
                                            <span className="bold">Age: </span> {age}
                                        </li>
                                        <li className="border p-2">
                                            <span className="bold">Emails: </span><br /> {emails.map(email => ` ${email.email}`)}
                                        </li>
                                        <li className="border p-2">
                                            <span className="bold">Company: </span> {company}
                                        </li>
                                        <li className="border p-2">
                                            <span className="bold">Type: </span> {type}
                                        </li>
                                    </ul>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-md-9">
                        <Query query={GET_PRODUCTS} variables={{stock:true}}>
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if (loading) return <Loader />
                                if (error) return error
                                let products = data.getProducts
                                return (
                                    <Fragment>
                                        <h2 className="text-center mb-5">Select Products</h2>
                                        <Select onChange={this.changeProducts} options={products} isMulti placeholder="Select products..." value={this.state.products} components={Animated()} getOptionValue={(options) => options.id} getOptionLabel={(options) => options.name} />
                                        {this.state.products.length !== 0 &&
                                            <Fragment>
                                                <h2 className="text-center my-5">Summary and Counts</h2>
                                                <table className="table">
                                                    <thead className="bg-primary text-light">
                                                        <tr className="bold">
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th>Stock</th>
                                                            <th>Count</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.products.map((product, index) => (
                                                            <tr key={product.id}>
                                                                <td className="pt-4">{product.name}</td>
                                                                <td className="pt-4">{product.price}</td>
                                                                <td className="pt-4">{product.stock}</td>
                                                                <td>
                                                                    <input onChange={e => this.changeCounts(e, index)} type="number" className="form-control" min="1" max={product.stock} defaultValue={product.count} />
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => this.deleteProduct(product.id, index)} type="button" className="btn btn-danger">&times; Delete</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <p className="float-right display-4">
                                                    <span className="bold">Total: </span> $ {this.state.total}
                                                </p>
                                                <Mutation mutation={NEW_ORDER}>
                                                    { newOrder => (
                                                        <button onClick={() => this.generateOrder(newOrder)} disabled={this.state.total === 0} type="button" className="btn btn-success mt-4">Generate Order</button>
                                                    )}
                                                </Mutation>
                                            </Fragment>
                                        }
                                    </Fragment>
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NewOrder