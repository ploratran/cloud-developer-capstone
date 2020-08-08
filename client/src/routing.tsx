import React from 'react'; 
import { Router, Route } from 'react-router-dom'; 
import createHistory from 'history/createBrowserHistory'; 
import App from './App'; 
import Auth from './auth/Auth'; 
import CallBack from './components/Callback'; 

// instantiate history object: 
const history = createHistory(); 

// instantiate an auth object wit 'history' props: 
// using 3rd party library outside of functional component: 
const auth = new Auth(history); 

const handleAuthentication = (props: any) => {
    const location = props.location; 
    // check if there're access token, id token returned from Auth0:
    if(/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication(); 
    }
}

// define makeAuthRouting functional component
// define routes being authenticated: 
export const makeAuthRouting = () => {
    return (
        <Router history={history}>
            <div>
                <Route 
                    path='/callback'
                    render={props => {
                        handleAuthentication(props)
                        return <CallBack/>
                    }}
                />
                <Route
                    render={props => {
                        // Pass auth, history props to App component: 
                        return <App auth={auth} {...props} />
                    }}
                />
            </div>
        </Router>
    )
}