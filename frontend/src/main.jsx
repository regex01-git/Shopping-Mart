
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app'
import './App.css'
import authReducer from './features/authSlice'
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import productsReducer,{productsFetch} from './features/productsSlice'
import cartReducer, { getTotals } from './features/cartSlice'
import { loadUser } from './features/authSlice';
import ErrorBoundary from './components/ErrorBoundary';
const store=configureStore({
  reducer:{
    products:productsReducer,
    cart:cartReducer,
    auth:authReducer

  }
})
store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loadUser())
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <ErrorBoundary>
   <App />
   </ErrorBoundary>
   </Provider>
  </BrowserRouter>  
)
