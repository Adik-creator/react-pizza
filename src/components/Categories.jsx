import React from "react";


const Categories = () => {

    const data = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    const [activeIndex, setActiveIndex] = React.useState(1)
    const changeIndex = (id) => {
        setActiveIndex(id)
    }
    return (
        <div className="categories">
            <ul>
                {data.map((item, index) => (
                    <li key={index} className={activeIndex === index ? "active" : ""}
                        onClick={() => changeIndex(index)}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
export {Categories}