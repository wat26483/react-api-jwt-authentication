import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './component/home/Homepage';
import Login from './component/loginandregister/Login';
import Register from './component/loginandregister/Register';
import Product from './component/Product/Product';
import SearchProd from './component/search/SearchProd';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/home' element = {<Homepage/>}/>
        <Route path='/product/:id' element = {<Product/>}/>
        <Route path='/productsearch/:id' element = {<SearchProd/>}/>
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
