import React from "react";
import {Header} from "./components/Header";
import './scss/app.scss'
import {NotFoundPage} from "./pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {CartPage} from "./pages/CartPage";
import {CartEmpty} from "./components/CartEmpty/CartEmpty";
import {FullPizza} from "./components/FullPizza";


export const SearchContext = React.createContext({});

const App = () => {
    const [searchValue, setSearchValue] = React.useState('')


    return (
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="cart" element={<CartPage/>}/>
                        <Route path={'cartEmpty'} element={<CartEmpty/>} />
                        <Route path={'fullPizza/:id'} element={<FullPizza/>} />
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
