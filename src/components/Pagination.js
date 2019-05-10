import React, { Component } from 'react'

class Pagination extends Component{

    state = { pagination: { pages: Math.ceil(Number(this.props.total) / this.props.limit) } }

    render(){
        const { current, onNext, onPrev } = this.props
        const { pages } = this.state.pagination

        const btnPrevious = (current > 1) ? <button onClick={onPrev} type="button" className="btn btn-success mr-2">&laquo; Previous</button> : ''
        const btnNext = (current !== pages) ? <button onClick={onNext} type="button" className="btn btn-success mr-2">&raquo; Next</button> : ''
        
        return (
            <div className="mt-5 d-flex justify-content-center">
                { btnPrevious }
                { btnNext }
            </div>
        )
    }

}

export default Pagination