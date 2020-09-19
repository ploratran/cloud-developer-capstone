import * as React from 'react'; 
import { Router, Route, Switch, Link } from 'react-router-dom'; 
import { Grid, Menu, Segment } from 'semantic-ui-react'; 
import Auth from './auth/Auth'; 
import { History } from 'history'; 
import NotFound from './components/NotFound'; 
import EditImage from './components/EditImage'; 
import ImagesList from './components/ImagesList';

interface AppProps {
  auth: Auth, 
  history: History, 
}

const App: React.FC<AppProps> = ({ auth, history }) => {

  const handleLogin = () => {
    auth.login(); 
  }; 

  const handleLogout = () => {
    auth.logout(); 
    history.push(`/`); 
  };  

  const logInLogOutButton = () => {
    if (auth.isAuthenticated()) {
      // when authenticated, able to logout
      return (
        <Menu.Item name='logout' onClick={handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      // when not authenticated, able to login
      return (
        <Menu.Item name='login' onClick={handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  };

  // define home and login/logout button headbar: 
  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name='home'>
          {/* define path to Homepage */}
          <Link to='/'>Home</Link>
        </Menu.Item>

        {/* define login/logout button */}
        <Menu.Menu position='right'>{logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }; 

  // define route for each component: 
  const generateCurrentPage = () => {

    return (
      <Switch>
        <Route 
          path="/"
          exact
          render={props => {
            return <ImagesList {...props} auth={auth}/>
          }}
        />

        {/* Route to Create/Update Image based on imageId */}
        <Route 
          path="/images/:imageId/edit" 
          exact
          render={props => {
            return <EditImage {...props} auth={auth}/>
          }}
        />

        {/* Route to display Not Found */}
        <Route component={NotFound}/>
      </Switch>
    )
  }

  return (
    <div>
      <Segment style={{padding: '8em 0em'}} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={history}>
                {generateMenu()}

                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

export default App;
