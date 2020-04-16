import React from 'react';
import axios from 'axios'

import './Tasks.sass'
import editSvg from '../../../src/image/edit.svg'

import AddTask from "./AddTask";
import Task from "./Task";

const Tasks = ({list, onAddTask, onRemoveTask, onEditTitle, onEditTask, onCompleteTask, empty}) => {

    const editTitle = () => {
        const newTitle = prompt('Новое название', list.name)
        if (newTitle !== "") {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                console.log('не удалось')
            })
        }
    }

    return (
        <div className='tasks'>
            <h2 className='tasks__title' style={{color: list.color.hex}}>
                {(list.name)}
                <img onClick={editTitle} src={editSvg} alt='Edit icon'/>
            </h2>
            <div className='tasks-list'>
                {
                    !empty && !list.tasks.length && <h2>Задач нет</h2>
                }
                {
                    list.tasks.map(task => (
                        <Task
                            key={task.id}
                            list={list}
                            onRemove={onRemoveTask}
                            onEdit={onEditTask}
                            onCompleteTask={onCompleteTask}
                            {...task} />
                    ))
                }
            </div>
            <AddTask key={list.id} list={list} onAddTask={onAddTask}/>
        </div>
    )
}

export default Tasks