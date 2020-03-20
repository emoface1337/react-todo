import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.sass'
import headIcon from './image/list.svg'
import {List, AddList, Tasks} from './components'

const App = () => {

    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data)
        })
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data)
        })
    }, [])

    const onAddList = (newItem) => {
        const newList = [
            ...lists, newItem
        ]
        setLists(newList)
    }

    return (
        <div className="todo-app d-flex">
            <div className="todo-sidebar">
                <List
                    items={[
                        {
                            className: "sidebar-list__head",
                            name: "Все задачи",
                            icon: <img
                                src={headIcon}
                                alt="Все задачи"/>
                        }]}
                />
                {lists ? (
                    <List items={lists}
                          isRemovable
                          onRemove={id => {
                              setLists(lists.filter(item => item.id !== id))
                          }}
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
                {lists && <Tasks list={lists[1]}/>}
            </div>
        </div>
    )
}

export default App
