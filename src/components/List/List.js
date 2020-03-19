import React from "react"
import classNames from 'classnames'
import './List.sass'
import removeSvg from '../../image/remove.svg'
import Circle from '../Circle/Circle'

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = item => {
        if (window.confirm('Точно?'))
            onRemove(item)
    }
    return (
        <ul className="sidebar-list" onClick={onClick}>
            {items.map((item, index) => (
                    <li key={index}
                        className={classNames("d-flex align-items-center", item.className, {active: item.active})}>
                        {
                            item.icon !== undefined ?
                                <i>{item.icon}</i> :
                                <Circle color={item.color}/>
                        }
                        <span>{item.name}</span>
                        {
                            isRemovable &&
                            <img
                                className={"sidebar-list__remove-icon"}
                                onClick={() => removeList(item)}
                                src={removeSvg}
                                alt="Удалить"
                            />
                        }
                    </li>
                )
            )}
        </ul>
    )
}

export default List