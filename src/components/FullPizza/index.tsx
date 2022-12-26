import React, {useState} from 'react';
import {useParams} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchPizzaItem} from "../../redux/slices/pizzaItems";
import axios from "axios";

export const FullPizza: React.FC = () => {
    const {id} = useParams()
    const [data, setData] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    // const dispatch = useDispatch()
    // const data = useSelector(state => state.pizza.data)

    // React.useEffect(() => {
    //     dispatch(fetchPizzaItem(id))
    // }, [id, dispatch])

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://637c636572f3ce38eaa0e257.mockapi.io/items/${id}`)
            return setData(response.data)
        }
        fetchData()
    }, [id])

    if (!data){
        return <>Loading ...</>
    }

    return (
        <div className="container">
            <img src={data?.imageUrl} alt="i"/>
            <p>{data?.title}</p>
            <p>{data?.price}</p>
        </div>
    );
};
