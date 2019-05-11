import React, { Fragment } from 'react'
import Header from './components/app/Header'
import Clients from './components/client/Clients'
import EditClient from './components/client/EditClient'
import NewClient from './components/client/NewClient'
import Products from './components/product/Products'
import EditProduct from './components/product/EditProduct'
import NewProduct from './components/product/NewProduct'
import NewOrder from './components/order/NewOrder'
import OrderClient from './components/order/OrderClient'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Graphics from './components/graphics/Graphics';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Session from './components/Session';



const App = ({ refetch, session }) => {

  const { getUser } = session
  const message = getUser ? `Welcome: ${getUser.name} - ${getUser.role}` : ''

  return (
    <Router>
      <Fragment>
        <Header session={session}/>
        <div className="container mb-5">
          <p className="text-right">{message}</p>
          <Switch>
            <Route exact path="/clients" render={() => <Clients session={session}/>} />
            <Route exact path="/client/edit/:id" component={EditClient} />
            <Route exact path="/client/new" render={() => <NewClient session={session}/>} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/edit/:id" component={EditProduct} />
            <Route exact path="/product/new" component={NewProduct} />
            <Route exact path="/order/new/:id" render={() => <NewOrder session={session}/>} />
            <Route exact path="/orders/:id" component={OrderClient} />
            <Route exact path="/graphics" component={Graphics} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" render={() => <Login refetch={refetch}/>} />
          </Switch>
          <ToastContainer bodyClassName="bold text-center" />
        </div>
      </Fragment>
    </Router>
  )
}

const RootSession = Session(App)
export { RootSession }
