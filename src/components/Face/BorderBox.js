import React from 'react'
import './Face.css';


const BorderBox = ({top, right, bottom, left}) => {
    return (
        <div 
            className = 'bounding-box' 
            style = {{top, right, bottom, left}}
        >
        </div>
    )
}

export default BorderBox