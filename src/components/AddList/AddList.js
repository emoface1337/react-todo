import React, {useState} from "react"
import './AddList.sass'
import closeIcon from '../../image/close.svg'

import List from "../List/List"
import Circle from "../Circle/Circle";


const AddList = ({colors}) => {
    const [isVisible, setVisible] = useState(false)
    const [selectedColor, selectColor] = useState(2)
    return (
        <div className="add-list">
            <List
                items={[
                    {
                        className: "sidebar-list__button",
                        "name": "Добавить папку",
                        "icon": <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    }]}
                onClick={() => setVisible(true)}
            />
            {
                isVisible &&
                <div className="add-list__popup">
                    <img src={closeIcon} alt="Закрыть" className="add-list__popup-close-button"
                         onClick={() => setVisible(false)}
                    />
                    <input type="text" className={"field"} placeholder={"Название списка"}/>
                    <div className="add-list__popup-colors d-flex justify-content-between align-items-center">
                        {colors.map(color => (
                            <Circle
                                key={color.id}
                                color={color.name}
                                onClick={() => selectColor(color.id)}
                                className={selectedColor === color.id && "active"}
                            />
                        ))}
                    </div>
                    <button className={"add-button"}>Добавить</button>
                </div>
            }
        </div>
    )
}

export default AddList

