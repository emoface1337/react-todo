import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Route, useHistory} from 'react-router-dom'

import {List, AddList, Tasks} from './components'

import './App.sass'
import headIcon from './image/list.svg'

const App = () => {

    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    const history = useHistory()

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

    const onRemoveList = (id) => {
        console.log(lists, id)
        setLists(lists.filter(item => item.id !== id))
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

    useEffect(() => {
        const listId = history.location.pathname.split('lists/')[1]
        lists && setActiveItem(lists.find(list => list.id === Number(listId)))
    }, [lists, history.location.pathname])

    return (
        <div className="todo-app d-flex">
            <div className="todo-sidebar">
                <List
                    onClickItem={list => {
                        history.push('/')
                    }}
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
                            onRemove={onRemoveList}
                            onClickItem={list => {
                                history.push(`/lists/${list.id}`)
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
                <Route exact path="/">
                    {
                        lists && lists.map(list =>
                            <Tasks
                                list={list}
                                onEditTitle={onEditListTitle}
                                onAddTask={onAddTask}
                                empty
                            />
                        )
                    }
                </Route>
                {
                    lists && activeItem &&
                    <Tasks list={activeItem} onEditTitle={onEditListTitle} onAddTask={onAddTask}/>
                }
            </div>
        </div>
    )
}

export default App
