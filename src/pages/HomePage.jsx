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

    React.useEffect(() => {
        const pizzas = async () => {
            try {
                const response = await axios(`${url}/items`)
                setItems(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log("Error>>>", error)
            }
        }
        pizzas()

        window.scrollTo(0, 0)  //При первом рендере нас перекинит самый вверх
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
                        : items.map(pizza => <PizzaBlock pizza={pizza} key={pizza.id}/>)
                }
            </div>
        </div>
    );
};
