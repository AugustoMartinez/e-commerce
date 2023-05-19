import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/Navbar/NavBar';
import Product from './Pages/Product';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home';
import Shop from './Pages/Shop';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='product/:id' element={<Product />} />
				<Route path='/shop' element={<Shop />} />
			</Routes>
			<Footer />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);