import './App.css';
import Navbar from './components/navbar/navbar.js';
import Cart from './pages/cart/CartPage.js';
import Home from './pages/home/HomePage.js';
import Login from './pages/login/login.js';
import Register from './pages/register/register.js';
import { Admin } from './pages/admin/admin.js';
import Viewusers from './components/viewUsers/viewusers.js';
import AddFoods from './components/addFood/addFoods.js'
import Footer from './pages/footer/Footer.js';
import Update from './pages/updateWallet/UpdateWallet.js';
import Stock from './pages/out _of _stock/stock.js';
import Contact from './components/contact/contact.js';
import ReadMessage from './pages/ReadMessage/ReadMessage.js';
import Order from './pages/orderPage/order.js';
import {Adminorders} from './pages/AdminordersPage/Adminorders.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Confirmed_orders from './pages/user_confirmed_oreders/Confirmed_orders.js';
import Old_orders_admin from './pages/Old_Orders_admin/Old_orders_admin.js';

function App() {
  return (
    <div className="App">
     <Router>
     <div className="header-container">
          <Navbar />
        </div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Cart/:id' element={<Cart/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Admin' element={<Admin/>}></Route>
        <Route path='/AddFood' element={<AddFoods/>}></Route>
        <Route path='/Viewusers' element={<Viewusers/>}></Route>
        <Route path='/Update/:id' element={<Update/>}></Route>
        <Route path='/Stock' element={<Stock/>}></Route>
        <Route path='/Contact/:id' element={<Contact/>}></Route>  
        <Route path='/Readmessage' element={<ReadMessage/>}></Route>  
        <Route path='/Order' element={<Order/>}></Route>  
        <Route path='/Adminorders' element={<Adminorders/>}></Route>   
        <Route path='/Confirmed_orders' element={<Confirmed_orders/>}></Route>   
        <Route path='/Old_orders_admin' element={<Old_orders_admin/>}></Route>        
      </Routes>
      
     </Router>
    </div>
  );
}

export default App;