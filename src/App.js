import {Routes,Route} from 'react-router-dom';
import AddSeries from './Pages/AddSeries';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import './App.css';
import PrivateRoute from './components/PrivateRoute';


function App() {


  return (
    <div className="container">
                <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/AddSeries" element ={<AddSeries/>}/>
                    <Route path="/"  element ={<Home/>}/>
                    <Route path="/Register" element = {<Register/>}/>
                </Route>
                <Route path="/Login" element = {<Login/>}/>
                </Routes>   
      </div>
    
  );
}

export default App;
