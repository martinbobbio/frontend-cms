import React, { Component, Fragment } from 'react'
import FormClient from './FormClient';
import { withRouter } from 'react-router-dom'

class NewClient extends Component {

    render() {
        const id = this.props.session.getUser.id
        return (
            <Fragment>
                <h2 className="text-success text-center display-4">New Client</h2>
                <FormClient idSeller={id}/>
            </Fragment>
        )
    }
}

export default withRouter(NewClient)