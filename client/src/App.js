
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/registration";




function App() {

  return (
    
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login></Login>} />
    <Route path="/register" element={<Register></Register>} />
    <Route path="/home" element={<Home></Home>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
