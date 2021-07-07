import { ThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink,InMemoryCache } from "@apollo/client"
//
import './App.css'
import theme from "./theme"
import Home from "./pages/Home"
import CountryListings from "./pages/countryListings"

const myLink: ApolloLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  // credentials: "include"
})
const myCache = new InMemoryCache()
const client = new ApolloClient({
  cache: myCache,
  link: myLink
})

function App() {
  return (
    <div>
      <Router>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/:countryCode" component={CountryListings}/>
            </Switch>
          </ThemeProvider>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;
