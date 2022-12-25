import React from 'react';
import qs from 'qs'
import {Link, useNavigate} from "react-router-dom";

import {Categories} from "../components/Categories";
import {list, Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setFilters} from "../redux/slices/filterSlice";
import {fetchPizza} from "../redux/slices/pizzasSlice";

export const HomePage = () => {

    const {categoryId, sort} = useSelector(state => state.filterPizza)
    const {items, status} = useSelector(state => state.dates)

    //Pagination --------------------------
    const currentPage = useSelector(state => state.filterPizza.currentPage)
    // ------------------------------------

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    console.log(qs, "qs")

    //context -------------------------------
    const {searchValue} = React.useContext(SearchContext)
    //--------------------------------------

    React.useEffect(() => {
        const params = qs.parse(window.location.search.substring(1))
        console.log(params)
        if (Object.keys(params).length === 0) return

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
    }, [dispatch])

    React.useEffect(() => {
        // window.scrollTo(0, 0)

        // if (!isSearch.current) {
        //
        // }

        const getItems = async () => {
            const sortBy = sort.sortProperty.replace("-", "")
            const order = sort.sortProperty.includes("-") ? "asc" : "desc"
            const category = categoryId > 0 ? `category=${categoryId}` : ``
            const search = searchValue ? `&search=${searchValue}` : ``

            // try {
            //     const response = await axios.get(`https://637c636572f3ce38eaa0e257.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${category}${search}`)
            //     dispatch(setItems(response.data))
            // } catch (error) {
            //     console.log("Error>>>", error)
            // }

            dispatch(fetchPizza({sortBy, order, category, search, currentPage}))
        }

        getItems()
        isSearch.current = false
    }, [sort?.sortProperty, categoryId, searchValue, currentPage, dispatch])


    React.useEffect(() => {
        console.log(categoryId, currentPage)

        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true

    }, [sort?.sortProperty, categoryId, currentPage, navigate])

    // search filter через js -----------------

    // const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ).map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)

    //---------------------------------


    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items.map(pizza =>
        <Link to={`/fullPizza/${pizza.id}`} key={pizza.id}>
            <PizzaBlock pizza={pizza}/>
        </Link>
    )


    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    status === 'loading' ? skeletons : pizzas
                }
            </div>

            <Pagination/>
        </div>
    );
};
