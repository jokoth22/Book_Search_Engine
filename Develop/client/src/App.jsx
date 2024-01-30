import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Set up our ApolloClient instance
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
    // Provide the ApolloClient to all child components
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
}

export default App;
