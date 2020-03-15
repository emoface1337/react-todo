import React from "react"
import List from "../List/List"
import './AddList.sass'
import Circle from "../Circle/Circle";
import closeIcon from '../../image/close.svg'

class AddList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selectedColor: 2
        }
    }

    render() {
        const selectColor = (color) => {
            this.setState({selectedColor: color})
        }

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
                    onClick={() => this.setState({visible: !this.state.visible})} //todo (visible: !this.state.visible)
                />
                {
                    this.state.visible &&
                    <div className="add-list__popup">
                        <img src={closeIcon} alt="Закрыть" className="add-list__popup-close-button"
                        onClick={() => this.setState({visible: false})}
                        />
                        <input type="text" className={"field"} placeholder={"Название списка"}/>
                        <div className="add-list__popup-colors d-flex justify-content-between align-items-center">
                            {this.props.colors.map(color => (
                                <Circle
                                    key={color.id}
                                    color={color.name}
                                    onClick={() => selectColor(color.id)}
                                    className={this.state.selectedColor === color.id && "active"}
                                />
                            ))}
                        </div>
                        <button className={"add-button"}>Добавить</button>
                    </div>
                }
            </div>
        )
    }
}

export default AddList

