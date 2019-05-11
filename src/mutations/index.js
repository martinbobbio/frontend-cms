import gql from 'graphql-tag'

export const NEW_CLIENT = gql`
mutation createClient($input:ClientInput){
    createClient(input: $input){
        id
        name
    }
}`

export const UPDATE_CLIENT = gql`
mutation updateClient($input:ClientInput){
    updateClient(input: $input){
        id
        name
    }
}`

export const DELETE_CLIENT = gql`
mutation deleteClient($id:ID!){
    deleteClient(id: $id)
}`

export const NEW_PRODUCT = gql`
mutation createProduct($input:ProductInput){
    createProduct(input: $input){
        id
        name
    }
}`

export const UPDATE_PRODUCT = gql`
mutation updateProduct($input:ProductInput){
    updateProduct(input: $input){
        id
        name
    }
}`

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id:ID!){
    deleteProduct(id: $id)
}`

export const NEW_ORDER = gql`
mutation createOrder($input:OrderInput){
    createOrder(input: $input){
        id
        client
    }
}`

export const UPDATE_ORDER = gql`
mutation updateOrder($input:OrderInput){
    updateOrder(input: $input){
        id
    }
}`

export const CREATE_USER = gql`
mutation createUser($user: String!, $password: String!, $role: String!, $name: String!){
    createUser(user: $user, password: $password, role: $role, name: $name)
}`

export const AUTH_USER = gql`
mutation authUser($user: String!, $password: String!){
    authUser(user: $user, password: $password){
        token
    }
}`