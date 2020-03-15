import React from "react"
import List from "../List/List"
import './AddList.sass'

class AddList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render() {
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
                    onClick={() => this.setState({visible: true})} //todo
                />
                {
                    this.state.visible &&
                    <div className="add-list__popup">
                        <input type="text" className={"field"} placeholder={"Название списка"}/>
                        <div className="add-list__popup-colors">
                            <ul>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <button className={"add-button"}>Добавить</button>
                    </div>
                }
            </div>
        )
    }
}

export default AddList

