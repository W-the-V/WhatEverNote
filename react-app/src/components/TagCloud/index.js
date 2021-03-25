import { TagCloud } from 'react-tagcloud'
import React from 'react'
import './index.css'

function Tags() {
    const data = [
        { value: 'Personal', count: 28 },
        { value: 'Coding', count: 30 },
        { value: 'Vacation', count: 28 },
        { value: 'Group Project', count: 38 },
        { value: 'HTML5', count: 33 },
        { value: 'MongoDB', count: 18 },
        { value: 'CSS3', count: 20 },
      ]
      const options = {
        luminosity: 'dark',
        hue: 'green',
      }
    return (
    <div className="Tags_Widget__container">
        <div className="N_Widget__header">
            <span className="Note_Widget_Note">POPULAR TAGS <i className="arrow right"></i></span>
        </div>
        <span>
        <TagCloud
        className="tagcloud"
        colorOptions={options}
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
        </span>
    </div>
        
    )
}

export default Tags