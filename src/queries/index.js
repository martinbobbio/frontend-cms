import gql from "graphql-tag"

export const GET_CLIENTS = gql`
    query getClients($limit: Int, $offset: Int){
            getClients(limit: $limit, offset: $offset){
            id
            name
            surname
            company
        }
        getTotalClients
    }
`

export const GET_CLIENT = gql`
    query getClient($id:ID){
        getClient(id:$id){
            id
            name
            surname
            company
            age
            type
            emails{
                email
            }
        }
    }
`

export const GET_TOP_CLIENTS = gql`
    query getTopClients{
        getTopClients{
            total
            client{
                name
            }
        }
    }
`


export const GET_PRODUCTS = gql`
    query getProducts($limit: Int, $offset: Int, $stock: Boolean){
        getProducts(limit: $limit, offset: $offset, stock: $stock){
            id
            name
            price
            stock
        }
        getTotalProducts
    }
`

export const GET_PRODUCT = gql`
    query getProduct($id:ID){
        getProduct(id:$id){
            id
            name
            price
            stock
        }
    }
`

export const GET_ORDERS = gql`
    query getOrders($client: ID){
        getOrders(client: $client){
            id
            total
            status
            date
            client
            order{
                id
                count
            }
        }
    }
`

export const GET_USER = gql`
    query getUser{
        getUser{
            user
        }
    }
`
