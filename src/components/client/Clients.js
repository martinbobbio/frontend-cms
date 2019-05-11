import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { GET_CLIENTS } from '../../queries';
import { DELETE_CLIENT } from '../../mutations';
import { toast } from 'react-toastify'

import Pagination from '../Pagination';
import Loader from '../loader/Loader';

class Clients extends Component {

    state = { offset:0, current:1, limit:5 }

    nextClientPage = () => this.setState({ offset: this.state.offset + this.state.limit, current: this.state.current + 1 })
    previousClientPage = () => this.setState({ offset: this.state.offset - this.state.limit, current: this.state.current - 1 })

    deleteSuccess = () => toast.error("THE CLIENT WAS DELETED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })

    render(){
        const { limit, offset, current } = this.state
        
        let id
        const { role } = this.props.session.getUser
        if(role === 'SELLER') id = this.props.session.getUser.id

        return(
            <Query query={GET_CLIENTS} pollInterval={1000} variables={{limit, offset, seller: id}}>
                {({ loading, error, data, startPolling, stopPolling }) =>  {
                    if(loading) return <Loader/>
                    if(error) return `Error: ${error}`
                    const clients = data.getClients
                    const totalClients = data.getTotalClients
                    return(
                        <Fragment>
                            <h2 className="text-primary text-center display-4">List of Clients</h2>
                            <ul className="list-group mt-4">
                                {clients.map(client => {
                                    const { id } = client
                                    return (
                                        <li key={id} className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                    {client.name} {client.surname} - {client.company}
                                                </div>
                                                <div className="col-md-6 d-flex justify-content-end">
                                                    <Link to={`/order/new/${id}`} className="btn btn-secondary d-block mx-1 d-md-inline-block">&#43; NEW ORDER</Link>
                                                    <Link to={`/orders/${id}`} className="btn btn-secondary d-block mx-1 d-md-inline-block">VIEW ORDERS</Link>
                                                    <Mutation mutation={DELETE_CLIENT} onCompleted={this.deleteSuccess}>
                                                        {deleteClient => 
                                                            <span onClick={() => deleteClient({variables:{id}})} className="btn btn-danger d-block d-md-inline-block mx-1 pointer">&times; DELETE</span>
                                                        }
                                                    </Mutation>
                                                    <Link to={`/client/edit/${id}`} className="btn btn-primary d-block mx-1 d-md-inline-block">EDIT</Link>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <Pagination current={current} total={totalClients} limit={limit} onNext={this.nextClientPage} onPrev={this.previousClientPage}/>
                        </Fragment>
                    )
                }} 
            </Query>
        )
    }
}
    
export default Clients