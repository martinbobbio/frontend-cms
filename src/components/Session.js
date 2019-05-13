import React from 'react'
import { Query } from 'react-apollo';
import { GET_USER } from '../queries';

const Session = Component => props => (
    <Query query={GET_USER}>
        {({loading, error, data, refetch}) => {
            if(loading) return null
            const route = window.location.pathname
            if(data){
                if((route !== "/login" && route !== "/register" && !data.getUser)){
                    window.location = "/login"
                }else{
                    return <Component {...props} refetch={refetch} session={data}/>
                }
            }
            return <p>The server is down</p>
        }}
    </Query>
)

export default Session