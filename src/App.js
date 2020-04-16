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

    const onRemoveTask = (listId, taskId) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter(task => task.id !== taskId)
            }
            return list
        })
        setLists(newList)
        axios
            .delete('http://localhost:3001/tasks/' + taskId)
            .catch(() => {
                console.log('не удалось удалить задачу')
            })
    }

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Новый текст задачи: ', taskObj.text)

        if (!newTaskText)
            return

        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskObj.id) {
                        task.text = newTaskText
                    }
                    return task
                })
            }
            return list
        })
        setLists(newList)
        axios
            .patch('http://localhost:3001/tasks/' + taskObj.id, {text: newTaskText})
            .catch(() => {
                console.log('не удалось обновить задачу')
            })
    }

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                lists.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed
                    }
                    return task
                })
            }
            return list
        })
        setLists(newList)
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {completed})
            .catch(() => {
                console.log('не удалось отметить задачу выполненной')
            })
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
                                active: history.location.pathname === "/",
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
                                key={list.id}
                                list={list}
                                onEditTitle={onEditListTitle}
                                onAddTask={onAddTask}
                                onRemoveTask
                                onEditTask={onEditTask}
                                onCompleteTask={onCompleteTask}
                                empty
                            />
                        )
                    }
                </Route>
                <Route path={'/lists/:id'}>
                    {
                        lists && activeItem &&
                        <Tasks
                            list={activeItem}
                            onAddTask={onAddTask}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                            onEditTitle={onEditListTitle}/>
                    }
                </Route>
            </div>
        </div>
    )
}

export default App
