import React,{useEffect} from 'react';
import styles from "./App.module.css";
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'

import { HomePage,SignInPage, RegisterPage, DetailPage,ShoppingCartPage, PlaceOrderPage } from './pages'
import { useSelector } from './redux/hooks'
import { useDispatch } from 'react-redux'
import { getShoppingCart } from './redux/shoppingCart/slice'

// 私有路由
const PrivateRoute = ({ component,isAuthenticated,...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (React.createElement(component, props)) : (<Redirect to={{pathname: "/signIn"}} />)
  }
  return <Route render={routeComponent} {...rest}/>
}

function App() {
  const jwt = useSelector(s => s.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  },[jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route  path="/signIn" component={SignInPage}/>
          <Route  path="/register" component={RegisterPage}/>
          <Route  path="/detail/:touristRouteId" component={DetailPage}/>
          <PrivateRoute isAuthenticated={jwt !== null} path="/shoppingCart" component={ShoppingCartPage}/>
          <PrivateRoute isAuthenticated={jwt !== null} path="/PlaceOrder" component={PlaceOrderPage}/>
          <Route render={() => <h1>404 not found</h1> }/>
        </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App;