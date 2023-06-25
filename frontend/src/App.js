import logo from './logo.svg';
import LoginPage from './containers/login-page/login-page';
import MainPage from './containers/main-page/main-page';
import Cookies from 'js-cookie';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';


function App() {
  const userId = Cookies.get('userId');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage page='login'/>}
          />
          <Route
            path="/"
            element={<MainPage page='main'/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;