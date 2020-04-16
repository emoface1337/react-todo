import React from 'react'
import editSvg from '../../image/edit.svg'
import removeSvg from '../../image/remove.svg'

const Task = ({id, text, completed, list, onRemove, onEdit, onCompleteTask}) => {
    const onChangeCheckbox = e => {
        onCompleteTask(list.id, id, e.target.checked)
    }

    return (
        <div key={id} className='tasks-list__item d-flex align-items-center'>
            <div className='checkbox'>
                <input
                    onChange={onChangeCheckbox}
                    id={`check-${id}`} type='checkbox'
                    checked={completed}
                />
                <label htmlFor={`check-${id}`}
                       className={'d-flex align-items-center justify-content-center'}>
                    <svg width='11' height='8' viewBox='0 0 11 8' fill='none'
                         xmlns='http://www.w3.org/2000/svg'>
                        <path d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001' stroke='#000'
                              strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                </label>
            </div>
            <div>{text}</div>
            <div className="tasks-list__item-actions d-flex">
                <img src={editSvg} alt="Edit" onClick={() => onEdit(list.id, {id, text})}/>
                <img src={removeSvg} alt="Remove" onClick={() => onRemove(list.id, id)}/>
            </div>
        </div>
    )
}

export default Task