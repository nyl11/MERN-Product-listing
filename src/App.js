import { BrowserRouter,Routes,Route} from 'react-router-dom'

//pages & component
import Home from './Pages/Home'
import CartPage from './Pages/CartPage';
import Navbar from "./Components/Navbar";
function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <div className='pages'>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
