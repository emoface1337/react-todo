import React from 'react';
import './Tasks.sass'
import editSvg from '../../../src/image/edit.svg'

const Tasks = ({list}) => {
    console.log(list)
    return (
        <div className='tasks'>
            <h2 className='tasks__title'>
                {(list.name)}
                <img src={editSvg} alt='Edit icon'/>
            </h2>
            <div className='tasks-list'>
                {list.tasks.map((task, index) => {
                    return (
                        <div key={index} className='tasks-list__item d-flex align-items-center'>
                            <div className='checkbox'>
                                <input id={`check-${task.id}`} type='checkbox'/>
                                <label htmlFor={`check-${task.id}`}
                                       className={'d-flex align-items-center justify-content-center'}>
                                    <svg width='11' height='8' viewBox='0 0 11 8' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001' stroke='#000'
                                              strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                                    </svg>
                                </label>
                            </div>
                            <p>{task.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tasks