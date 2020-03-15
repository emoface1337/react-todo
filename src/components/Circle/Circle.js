import React from 'react';
import classnames from 'classnames'

import './Circle.sass'

const Circle = ({color, onClick, className}) => (
    <i className={classnames('circle', {[`circle--${color}`]: color}, className)} onClick={onClick}/>
)

export default Circle