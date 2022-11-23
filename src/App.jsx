import React from "react";
import {Header} from "./components/Header";
import './scss/app.scss'
import {NotFoundPage} from "./pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {CartPage} from "./pages/CartPage";


const App = () => {
    return (<div className="wrapper">
        <Header/>
        <div className="content">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    </div>);
}

export default App;
