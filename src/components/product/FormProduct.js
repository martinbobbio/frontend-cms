import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'
import { NEW_PRODUCT, UPDATE_PRODUCT } from '../../mutations'


class FormProduct extends Component {

    state = { product: this.props.product ? this.props.product : { name:'', price:'', stock:'' },
}

    handleChange = e =>{
        const { name, value } = e.target
        const { product } = this.state
        this.setState({ product: { ...product, [name]: value } })

        if (!product.name || !product.price || !product.stock) this.setState({ error: true })
        else this.setState({ error: false })
    }

    validate = () => {
        const { product } = this.state
        const invalid = !product.name || !product.price || !product.stock
        return invalid  
    }

    submitForm = (e, method) => {
        e.preventDefault()
        method().then(() => {
            if (!this.props.product) {
                toast.success("THE PRODUCT WAS CREATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
                this.props.history.push('/products')
            }
            else {
                toast.info("THE PRODUCT WAS UPDATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
                this.props.refetch().then(() => this.props.history.push('/products'))
            }
        })
    }

    render() {
        const { error } = this.state
        const { product } = this.props
        const { id } = this.props.match.params

        const { name, price, stock } = this.state.product
        const input = { name, price:Number(price), stock:Number(stock), id }

        const errorHTML = error ? <p className="alert alert-danger p-3 text-center bold">All fields are required</p> : ''

        return (
            <Fragment>
                {errorHTML}
                <div className="row justify-content-center">
                    { !product &&
                        <Mutation mutation={NEW_PRODUCT} variables={{input}}>
                            {(createProduct, {loading, error, data}) => {
                                return(
                                    <form onSubmit={e => this.submitForm(e, createProduct)} className="col-md-8">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input onChange={this.handleChange} type="text" name="name" className="form-control" placeholder="Product's name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">$</div>
                                                </div>
                                                <input onChange={this.handleChange} type="number" name="price" className="form-control" placeholder="Product's price"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Stock</label>
                                            <input onChange={this.handleChange} type="number" name="stock" className="form-control" placeholder="Product's stock"/>
                                        </div>
                                        <button disabled={this.validate()} type="submit" className="btn btn-success float-right">CREATE PRODUCT</button>
                                    </form>
                                )
                            }}
                        </Mutation>
                    }
                    { product &&
                        <Mutation mutation={UPDATE_PRODUCT} variables={{input}}>
                            {(updateProduct, {loading, error, data}) => {
                                return(
                                    <form onSubmit={e => this.submitForm(e, updateProduct)} className="col-md-8">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input onChange={this.handleChange} defaultValue={name} type="text" name="name" className="form-control" placeholder="Product's name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">$</div>
                                                </div>
                                                <input onChange={this.handleChange} defaultValue={price} type="number" name="price" className="form-control" placeholder="Product's price"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Stock</label>
                                            <input onChange={this.handleChange} defaultValue={stock} type="number" name="stock" className="form-control" placeholder="Product's stock"/>
                                        </div>
                                        <button disabled={this.validate()} type="submit" className="btn btn-success float-right">UPDATE PRODUCT</button>
                                    </form>
                                )
                            }}
                        </Mutation>
                    }
                </div>
            </Fragment>
        )
    }
}

export default withRouter(FormProduct)