import React, { Component, Fragment } from 'react'
import FormClient from './FormClient';

class NewClient extends Component {

    render() {
        return (
            <Fragment>
                <h2 className="text-success text-center display-4">New Client</h2>
                <FormClient/>
            </Fragment>
        )
    }
}

export default NewClient