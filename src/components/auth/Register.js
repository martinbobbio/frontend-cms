import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { CREATE_USER } from '../../mutations';
import Loader from '../loader/Loader';
import Error from '../error/Error';

const initialState = { user: '', password: '', repeatPassword:'' }

class Register extends Component {

    state = { ...initialState }

    handleChange = e =>{
        const { name, value } = e.target
        this.setState({[name]:value})
    }

    validate = () =>{
        const { user, password, repeatPassword } = this.state
        const invalid = !user || !password || !repeatPassword || password !== repeatPassword
        return invalid
    }

    submit = (e, method) => {
        e.preventDefault()
        method().then(() => {
            this.reset()
            this.props.history.push('/login')
        })
    }

    reset = () => this.setState({...initialState})

    render(){

        const { user, password, repeatPassword } = this.state

        return(
            <Fragment>
                <h1 className="text-center text-primary mb-5">Create User</h1>
                <div className="row justify-content-center">
                    <Mutation mutation={CREATE_USER} variables={{user, password}}>
                        {(createUser, {loading, error, data}) => {
                            if(loading) return <Loader/>
                            return(
                                <form className="col-md-8" onSubmit={e => this.submit(e, createUser)}>
                                    {error && <Error error={error}/>}
                                    <div className="form-group">
                                        <label>User</label>
                                        <input onChange={this.handleChange} value={user} type="text" name="user" className="form-control" placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input onChange={this.handleChange} value={password} type="password" name="password" className="form-control" placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Repeat Password</label>
                                        <input onChange={this.handleChange} value={repeatPassword} type="password" name="repeatPassword" className="form-control" placeholder="Repeat Password"/>
                                    </div>
                                    <button disabled={this.validate()} type="submit" className="btn btn-success float-right">Sign up</button>
                                    <p className="mt-4 pt-3">
                                        <Link to="/login">Sign in</Link>
                                    </p>
                            </form>
                            )
                        }}
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}
    
export default withRouter(Register)