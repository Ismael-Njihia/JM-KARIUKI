import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';

import Homepage from './screens/Homepage';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import HealthDataForm from "./screens/HealthDataForm";
import Register from "./screens/Register";
import UserRoute from './components/UserRoute';


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      <Route path='/' element={<UserRoute />}>
        <Route path='/health' element={<HealthDataForm />} />
        </Route>

    </Route>
  )
)


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);



reportWebVitals()

