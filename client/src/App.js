import { Switch, BrowserRouter, Route} from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';

function App() {
  
  return (
		<BrowserRouter>
			<Switch>
				<Route component={AuthPage} exact path="/auth" />
			</Switch>
		</BrowserRouter>
	);
}

export default App;