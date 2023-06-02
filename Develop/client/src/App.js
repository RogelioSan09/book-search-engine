import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
// Import the ApolloClient, ApolloProvider, and InMemoryCache modules from @apollo/client
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Create a new instance of the ApolloClient class and pass in an object with the uri property set to the GraphQL API's endpoint
const client = new ApolloClient({
  // Set the uri property to the GraphQL API's endpoint
  uri: '/graphql',
  // Set the cache property to a new instance of the InMemoryCache class
  cache: new InMemoryCache(),
  // Set the request property to a function that will execute every time the client makes a request to the API
  request: (operation) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('id_token');
    // Set the HTTP request headers to include the token
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

// Wrap the entire app in the ApolloProvider component and pass in the client as a prop
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
