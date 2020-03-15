import React from 'react';
import './Circle.sass'

const Circle = ({color}) => (
    <i className={`circle circle--${color}`}/>
)

export default Circle