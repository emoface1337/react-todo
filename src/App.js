import React, {useState} from 'react'
import './App.sass'
import db from './db'
import headIcon from './image/list.svg'
import List from "./components/List/List"
import AddList from "./components/AddList/AddList"
import Tasks from "./components/Tasks/Tasks";

const App = () => {
    const [lists, setLists] = useState(db.lists.map(item => {
        item.color = db.colors.find(color => color.id === item.colorId).name
        return item
    }))

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
                <List
                    items={lists}
                    onRemove={(item) => console.log(item)} //todo
                    isRemovable
                />
                <AddList
                    colors={db.colors}
                    onAdd={onAddList}
                />
            </div>
            <div className="todo-tasks">
                <Tasks/>
            </div>
        </div>
    )
}

export default App
