import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

let URL_BACKEND = ''

if(process.env.NODE_ENV === 'development') URL_BACKEND = 'http://localhost:5000/graphql'
else if(process.env.NODE_ENV === 'prod') URL_BACKEND = "https://martinbobbio-cms.herokuapp.com/graphql"
else if(process.env.NODE_ENV === 'docker') URL_BACKEND = "http://192.168.99.100:8083/graphql"

const client = new ApolloClient({
    uri: URL_BACKEND,
    fetchOptions: {
        credentials: 'include',
        mode: "no-cors"

    },
    request: operation => {
        const token = localStorage.getItem("token")
        operation.setContext({
        headers: { authorization: token }
        })
    },
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({ netWorkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('netWorkError', netWorkError)
    }
})

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
