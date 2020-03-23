import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.sass'
import headIcon from './image/list.svg'
import {List, AddList, Tasks} from './components'

const App = () => {

    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data)
        })
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data)
        })
    }, [])

    const onAddList = (newListItem) => {
        const newList = [
            ...lists, newListItem
        ]
        setLists(newList)
    }

    const onAddTask = (listId, newTask) => {
        const newList = lists.map(item => {
                if (item.id === listId)
                    item.tasks = [...item.tasks, newTask]
                return item
            }
        )
        setLists(newList)
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title
            }
            return item
        })
        setLists(newList)
    }

    return (
        <div className="todo-app d-flex">
            <div className="todo-sidebar">
                <List
                    items={
                        [
                            {
                                active: true,
                                className: "sidebar-list__head",
                                name: "Все задачи",
                                icon: <img
                                    src={headIcon}
                                    alt="Все задачи"/>
                            }
                        ]}
                />
                {
                    lists ? (
                        <List
                            items={lists}
                            onRemove={id => {
                                setLists(lists.filter(item => item.id !== id))
                            }}
                            onClickItem={item => {
                                setActiveItem(item)
                            }}
                            activeItem={activeItem}
                            isRemovable
                        />
                    ) : (
                        'Загрузка...'
                    )}
                <AddList
                    colors={colors}
                    onAdd={onAddList}
                />
            </div>
            <div className="todo-tasks">
                {
                    lists && activeItem &&
                    <Tasks list={activeItem} onEditTitle={onEditListTitle} onAddTask={onAddTask}/>
                }
            </div>
        </div>
    )
}

export default App
