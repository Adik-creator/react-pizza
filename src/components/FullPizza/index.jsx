import React from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzaItem} from "../../redux/slices/pizzaItems";

export const FullPizza = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const data = useSelector(state => state.pizza.data)

    React.useEffect(() => {
        dispatch(fetchPizzaItem(id))
    }, [id, dispatch])

    return (
        <div className="container">
            <img src={data?.imageUrl} alt="i"/>
            <p>{data?.title}</p>
            <p>{data?.price}</p>
        </div>
    );
};
