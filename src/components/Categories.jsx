import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeIndex} from "../redux/slices/filterSlice";


const Categories = () => {

    const data = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    const categoryId = useSelector(state => state.filterPizza.categoryId)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {data.map((item, index) => (
                    <li
                        key={index}
                        className={categoryId === index ? "active" : ""}
                        onClick={() => dispatch(changeIndex(index))}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export {Categories}