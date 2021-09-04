import { Switch, BrowserRouter, Route} from 'react-router-dom';
import  Login  from './components/login';
import  Register from "./components/register";


function App() {
  
  return (<BrowserRouter>
		<Switch>
			<Route component={Register} exact path="/register" />
			<Route component={Login} exact path="/login" />
		</Switch>
	</BrowserRouter>
  );
}

export default App;