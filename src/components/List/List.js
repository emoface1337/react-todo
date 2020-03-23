import React from 'react'
import axios from 'axios'
import classNames from 'classnames'

import './List.sass'
import removeSvg from '../../image/remove.svg'
import Circle from '../Circle/Circle'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = item => {
        axios.delete('http://localhost:3001/lists/' + item.id).then(res => {
            onRemove(item.id)
        })
    }
    return (
        <ul className='sidebar-list' onClick={onClick}>
            {items.map((item, index) => (
                    <li key={index}
                        onClick={onClickItem ? () => onClickItem(item) : null}
                        className={classNames('d-flex align-items-center', item.className, {active: item.active ? item.active : activeItem && activeItem.id === item.id})}>
                        {
                            item.icon !== undefined ?
                                <i>{item.icon}</i> :
                                <Circle color={item.color.name}/>
                        }
                        <span>{item.name}{item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
                        {
                            isRemovable &&
                            <img
                                className={'sidebar-list__remove-icon'}
                                onClick={() => removeList(item)}
                                src={removeSvg}
                                alt='Удалить'
                            />
                        }
                    </li>
                )
            )}
        </ul>
    )
}

export default List