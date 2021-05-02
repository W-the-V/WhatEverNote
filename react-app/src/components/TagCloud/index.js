import { TagCloud } from 'react-tagcloud'
import { useSelector } from 'react-redux'
import React from 'react'
import './index.css'

function Tags() {
  const tags = useSelector((state) => state?.tags?.tags?.tags)  
  let data;
  if (tags !== undefined){
    data = tags.map(tag => {
    return {value: tag.name, count: tag.notes.length }
  })
}
  console.log(data, "what is happening")
      const options = {
        luminosity: 'dark',
        hue: 'green',
      }
    return (
    <div className="Tags_Widget__container">
        <div className="N_Widget__header">
            <span className="Note_Widget_Note">MY TAGS <i className="arrow right"></i></span>
        </div>
        <span>
        {tags?   
        <TagCloud
        className="tagcloud"
        colorOptions={options}
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={tag => alert(`'${tag.value}' was selected!`)}
        /> : null
      }
        </span>
    </div>
        
    )
}

export default Tags