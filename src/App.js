import React, {Component} from 'react'
import './App.sass'
import db from './db'
import headIcon from './image/list.svg'
import List from "./components/List/List"
import AddList from "./components/AddList/AddList"

export default class App extends Component {

    state = {
        test: true
    }

    render() {
        return (
            <div className="todo-app">
                <div className="todo-sidebar">
                    <List
                        items={[
                            {
                                className: "sidebar-list__head",
                                "name": "Все задачи",
                                "icon": <img
                                    src={headIcon}
                                    alt="Все задачи"/>
                            }]}
                    />
                    <List
                        items={[
                            {
                                "name": "Покупки",
                                "color": "green"
                            },
                            {
                                "name": "Фронтенд",
                                "color": "blue",
                                active: true
                            },
                            {
                                "name": "Фильмы и сериалы",
                                "color": "pink"
                            },
                            {
                                "name": "Книги",
                                "color": "lime"
                            },
                            {
                                "name": "Личное",
                                "color": "grey"
                            }
                        ]}
                        isRemovable
                    />
                    <AddList colors={db.colors}/>
                </div>
                <div className="todo-tasks">123</div>
            </div>
        )
    }
}
