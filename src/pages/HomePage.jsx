import React from 'react';
import qs from 'qs'
import {useNavigate} from "react-router-dom";

import {Categories} from "../components/Categories";
import {list, Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import axios from "axios";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "../redux/slices/filterSlice";

export const HomePage = () => {

    //Base url ----------------------------
    const url = 'https://637c636572f3ce38eaa0e257.mockapi.io'
    //------------------------------------

    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    //Pagination --------------------------
    const currentPage = useSelector(state => state.filterPizza.currentPage)
    // ------------------------------------

    //context -------------------------------
    const {searchValue} = React.useContext(SearchContext)
    //--------------------------------------

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const {categoryId, sort} = useSelector(state => state.filterPizza)


    // React.useEffect(() => {
    //     if (window.location.search){
    //         const params = qs.parse(window.location.search.substring(1))
    //         const sortItems = list.find(item => item.sortProperty === params.sort)
    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sortItems
    //             })
    //         )
    //
    //     }
    // }, [])

    React.useEffect(() => {
        (async () => {
            const sortBy = sort.sortProperty.replace("-", "")
            const order = sort.sortProperty.includes("-") ? "asc" : "desc"
            const category = categoryId > 0 ? `category=${categoryId}` : ``
            const search = searchValue ? `&search=${searchValue}` : ``

            try {
                setIsLoading(true)
                const response = await axios.get(`${url}/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${category}${search}`)
                setItems(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log("Error>>>", error)
            }
        })()

        window.scrollTo(0, 0)
    }, [sort, categoryId, searchValue, currentPage])


    // React.useEffect(() => {
    //     const queryString = qs.stringify({
    //         sort: sort.sortProperty,
    //         categoryId,
    //         currentPage,
    //     })
    //
    //     navigate(`?${queryString}`)
    //
    // }, [sort, categoryId, currentPage, navigate])


    // search filter через js -----------------

    // const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ).map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)

    //---------------------------------


    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items.map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? skeletons : pizzas
                }
            </div>

            <Pagination />
        </div>
    );
};
