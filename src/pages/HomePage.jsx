import React from 'react';
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import axios from "axios";

export const HomePage = () => {
    const url = 'https://637c636572f3ce38eaa0e257.mockapi.io'

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const [sort, setSort] = React.useState({
        title: "популярности (DESC)",
        sortProperty: "rating",
    })

    const [categoryId, setCategoryId] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            const sortBy = sort.sortProperty.replace("-", "")
            const order = sort.sortProperty.includes("-") ? "asc" : "desc"
            const category = categoryId > 0 ? `category=${categoryId}` : ``

            try {
                setIsLoading(true)
                const response = await axios.get(`${url}/items?sortBy=${sortBy}&order=${order}&${category}`)
                setItems(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log("Error>>>", error)
            }
        })()

        window.scrollTo(0, 0)
    }, [sort, categoryId])

    return (<div className="container">
        <div className="content__top">
            <Categories category={categoryId} setCategoryId={setCategoryId}/>
            <Sort sort={sort} setSort={setSort}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">

            {
                isLoading ? [...new Array(8)].map((_, index) =>
                    <Skeleton key={index}/>) : items.map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)
            }
        </div>
    </div>);
};
