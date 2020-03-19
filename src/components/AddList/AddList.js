import React, {useState} from "react"
import './AddList.sass'
import closeIcon from '../../image/close.svg'

import List from "../List/List"
import Circle from "../Circle/Circle";

const AddList = ({colors, onAdd}) => {
    const [isVisible, setVisible] = useState(false)
    const [selectedColor, selectColor] = useState(2)
    const [inputValue, setInputValue] = useState('')

    const onClose = () => {
        setVisible(false)
        setInputValue('')
        selectColor(2)
    }

    const addList = () => {
        onAdd({id: Math.random(), name: inputValue, color: colors.find(color => color.id === selectedColor).name})
        onClose()
    }

    return (
        <div className="add-list">
            <List
                items={[
                    {
                        className: "sidebar-list__button",
                        name: "Добавить папку",
                        icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
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
                         onClick={onClose}
                    />
                    <input onChange={e => setInputValue(e.target.value)} value={inputValue} type="text"
                           className={"field"} placeholder={"Название списка"}/>
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
                    <button onClick={addList} className={"add-button"}>Добавить</button>
                </div>
            }
        </div>
    )
}

export default AddList

