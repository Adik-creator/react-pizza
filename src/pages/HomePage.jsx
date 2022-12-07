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

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //Pagination --------------------------
    const currentPage = useSelector(state => state.filterPizza.currentPage)
    // ------------------------------------

    //context -------------------------------
    const {searchValue} = React.useContext(SearchContext)
    //--------------------------------------

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const {categoryId, sort} = useSelector(state => state.filterPizza)


    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            // console.log(params, "hello")
            const sort = list.find(item => item.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            // ------------------------------
            // Чтобы не отправить запросы 2 раза
            // Когда приложения первый раз рендерится она чтобы получить данные отправить запрос
            // Потом получает данные из url и еще раз рендерится чтобы избежать этого используем "isSearch"

            isSearch.current = true

            // -------------------------------
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            (
                async () => {
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
                }
            )()
        }

        isSearch.current = false
    }, [sort.sortProperty, categoryId, searchValue, currentPage])


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true

    }, [sort.sortProperty, categoryId, currentPage, navigate])

    // search filter через js -----------------

    // const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ).map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)

    //---------------------------------


    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items.map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? skeletons : pizzas
                }
            </div>

            <Pagination/>
        </div>
    );
};
