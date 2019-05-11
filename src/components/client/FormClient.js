import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify'
import { NEW_CLIENT, UPDATE_CLIENT } from '../../mutations'


class FormClient extends Component {
    state = {
        client: this.props.client ? this.props.client : { name: '', surname: '', company: '', email: '', age: '', type: '' },
        emails: this.props.client ? this.props.client.emails : [],
        error: false
    }

    submitForm = (e, method, id) => {
        e.preventDefault()
        const { name, surname, company, age, type } = this.state.client
        const { emails, error } = this.state
        const input = { name, surname, company, age: Number(age), type, emails, id, seller:this.props.idSeller }
        if (!error) {
            method({ variables: { input } })
            if (!this.props.client) {
                toast.success("THE CLIENT WAS CREATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
                this.props.history.push('/clients')
            }
            else {
                toast.info("THE CLIENT WAS UPDATED", { position: toast.POSITION.BOTTOM_CENTER, closeButton: false, })
                this.props.refetch().then(() => this.props.history.push('/clients'))
            }
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        const { client } = this.state
        client[name] = value
        this.setState({ client: { ...client, [name]: value } })

        if (!client.name || !client.surname || !client.company || !client.age || !client.type) this.setState({ error: true })
        else this.setState({ error: false })
    }

    addField = () => {
        this.setState({ emails: this.state.emails.concat([{ email: '' }]) })
    }

    deleteField = i => {
        this.setState({ emails: this.state.emails.filter((email, index) => i !== index) })
    }

    changeFields = (e, i) => {
        const newEmail = this.state.emails.map((email, index) => {
            if (i !== index) return email
            return { ...email, email: e.target.value }
        })
        this.setState({ emails: newEmail })
    }

    render() {
        const { error, client, emails } = this.state
        const { id } = this.props.match.params
        const errorHTML = error ? <p className="alert alert-danger p-3 text-center bold">All fields are required</p> : ''
        return (
            <Fragment>
                {!this.props.client &&
                    <Fragment>
                        {errorHTML}
                        <div className="row justify-content-center">
                            <Mutation mutation={NEW_CLIENT}>
                                {createClient => (
                                    <form className="col-md-8 m-3" onSubmit={e => this.submitForm(e, createClient)}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input name="name" onChange={this.handleChange} type="text" className="form-control" placeholder="Name" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Surname</label>
                                                <input name="surname" onChange={this.handleChange} type="text" className="form-control" placeholder="Surname" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label>Company</label>
                                                <input name="company" onChange={this.handleChange} type="text" className="form-control" placeholder="Company" />
                                            </div>
                                            {emails.map((input, index) =>
                                                <div key={index} className="form-group col-md-12">
                                                    <label>Email {index + 1}:</label>
                                                    <div className="input-group">
                                                        <input onChange={e => this.changeFields(e, index)} type="email" placeholder={`Email ${index + 1}`} className="form-control" />
                                                        <div className="input-group-append">
                                                            <button onClick={() => this.deleteField(index)} className="btn btn-danger" type="button">&times; Delete</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            )}
                                            <div className="form-group d-flex justify-content-center col-md-12">
                                                <button onClick={this.addField} type="button" className="btn btn-warning">+ Add Email</button>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Age</label>
                                                <input name="age" onChange={this.handleChange} type="text" className="form-control" placeholder="Age" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Type of Client</label>
                                                <select name="type" onChange={this.handleChange} className="form-control">
                                                    <option value="">Chose...</option>
                                                    <option value="PREMIUM">PREMIUM</option>
                                                    <option value="BASIC">BASIC</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-success float-right">CREATE CLIENT</button>
                                    </form>
                                )}
                            </Mutation>
                        </div>
                    </Fragment>
                }
                {this.props.client &&
                    <Fragment>
                        {errorHTML}
                        <div className="row justify-content-center">
                            <Mutation mutation={UPDATE_CLIENT}>
                                {updateClient => (
                                    <form onSubmit={e => this.submitForm(e, updateClient, id)} className="col-md-8 m-3">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input name="name" type="text" onChange={this.handleChange} defaultValue={client.name} className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Surname</label>
                                                <input name="surname" type="text" onChange={this.handleChange} defaultValue={client.surname} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label>Company</label>
                                                <input name="company" type="text" onChange={this.handleChange} defaultValue={client.company} className="form-control" />
                                            </div>

                                            {emails.map((email, index) => (
                                                <div key={index} className="form-group col-md-12">
                                                    <label>Email {index + 1} : </label>
                                                    <div className="input-group">
                                                        <input onChange={e => this.changeFields(e, index)} name="email" type="email" placeholder={`Email`} className="form-control" defaultValue={email.email} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-danger" type="button" onClick={() => this.deleteField(index)}> &times; DELETE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="form-group d-flex justify-content-center col-md-12">
                                                <button onClick={this.addField} type="button" className="btn btn-warning">+ ADD EMAIL</button>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Age</label>
                                                <input name="age" onChange={this.handleChange} defaultValue={client.age} type="text" className="form-control" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Type of Client</label>
                                                <select name="type" onChange={this.handleChange} defaultValue={client.type} className="form-control">
                                                    <option value="">Chose...</option>
                                                    <option value="PREMIUM">PREMIUM</option>
                                                    <option value="BASIC">BASIC</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary float-right">UPDATE CLIENT</button>
                                    </form>
                                )}
                            </Mutation>
                        </div>
                    </Fragment>
                }
            </Fragment>

        )
    }
}

export default withRouter(FormClient)