import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { RootSession } from './App';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    fetchOptions: {
        credentials: 'include'
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

ReactDOM.render(<ApolloProvider client={client}><RootSession/></ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
