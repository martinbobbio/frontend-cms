import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { GET_PRODUCTS } from '../../queries';
import { DELETE_PRODUCT } from '../../mutations';
import { toast } from 'react-toastify'
import Pagination from '../Pagination';
import Loader from '../loader/Loader';

class Products extends Component {

    state = { offset:0, current:1, limit:5 }

    nextProductsPage = () => this.setState({ offset: this.state.offset + this.state.limit, current: this.state.current + 1 })
    previousProductsPage = () => this.setState({ offset: this.state.offset - this.state.limit, current: this.state.current - 1 })
    
    deleteSuccess = () => toast.error("THE CLIENT WAS DELETED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })

    render(){
        const { limit, offset, current } = this.state
        return(
            <Fragment>
                <h2 className="text-primary text-center display-4">List of Products</h2>
                <Query query={GET_PRODUCTS} pollInterval={1000} variables={{limit, offset}}>
                    {({ loading, error, data, startPolling, stopPolling }) =>  {
                        if(loading) return <Loader/>
                        if(error) return `Error: ${error}`
                        const products = data.getProducts
                        const totalProducts = data.getTotalProducts
                        return(
                            <Fragment>
                                <table className="table">
                                    <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => {
                                            const { id } = product
                                            return(
                                                <tr key={id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <Mutation mutation={DELETE_PRODUCT} onCompleted={this.deleteSuccess}>
                                                            {deleteClient => 
                                                                <button onClick={() => deleteClient({variables:{id}})} className="btn btn-danger" type="button">&times; DELETE</button>
                                                            }
                                                        </Mutation>
                                                        
                                                        <Link to={`/product/edit/${id}`} className="btn btn-primary ml-2">EDIT</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <Pagination current={current} total={totalProducts} limit={limit} onNext={this.nextProductsPage} onPrev={this.previousProductsPage}/>
                            </Fragment>
                        )
                    }} 
                </Query>
            </Fragment>
        )
    }
}
    
export default Products