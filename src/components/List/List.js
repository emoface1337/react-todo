import React from "react"
import classNames from 'classnames'
import './List.sass'
import Circle from '../Badge/Circle'

const List = ({items, isRemovable, onClick}) => {
    return (
        <ul className="sidebar-list" onClick={onClick}>
            {items.map((item, index) => (
                    <li key={index}
                        className={classNames("d-flex align-items-center", item.className, {active: item.active})}
                    >
                        {item.icon !== undefined ? <i>{item.icon}</i> :
                            <Circle color={item.color}/>}
                        <span>{item.name}</span>
                    </li>
                )
            )}
        </ul>
    )
}

export default List