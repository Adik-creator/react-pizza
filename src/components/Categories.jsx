import React from "react";


const Categories = ({category, setCategoryId}) => {

    const data = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    const changeIndex = (id) => {
        setCategoryId(id)
    }

    return (
        <div className="categories">
            <ul>
                {data.map((item, index) => (
                    <li
                        key={index}
                        className={category === index ? "active" : ""}
                        onClick={() => changeIndex(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export {Categories}