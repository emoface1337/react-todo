import React, {useState} from 'react'
import axios from 'axios'

import addSvg from "../../image/add.svg";

const AddTask = ({list, onAddTask}) => {

    const [isVisible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setLoading] = useState(false)

    const toggleVisible = () => {
        setVisible(!isVisible)
        setInputValue('')
    }

    const addTask = () => {
        setLoading(true)
        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        axios.post('http://localhost:3001/tasks', newTask).then(({data}) => {
                onAddTask(list.id, data)
                toggleVisible()
            }
        ).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="tasks-form ">
            {!isVisible ? (<div onClick={toggleVisible} className="tasks-form__add d-flex align-items-center">
                    <img src={addSvg} alt="Добавить"/>
                    <span>Новая задача</span>
                </div>) :
                (<div className="tasks-form__add-block">
                    <input value={inputValue} onChange={e => setInputValue(e.target.value)} type='text'
                           className={'field'} placeholder={'Текст задачи'}/>
                    <button onClick={addTask}
                            className="button button--green">{isLoading ? 'Добавляем...' : 'Добавить задачу'}</button>
                    <button onClick={toggleVisible} className="button button--grey">Отмена</button>
                </div>)
            }
        </div>
    )
}

export default AddTask