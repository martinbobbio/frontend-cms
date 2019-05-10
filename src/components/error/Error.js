import React from 'react'

const Error = ({error}) => {
    if(error.message) error = error.message
    return(
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
    )
}

export default Error;