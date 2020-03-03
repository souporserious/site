import React from 'react'

export default function(props) {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 440,
        height: 220,
        fontSize: 40,
        backgroundColor: 'rgb(10, 25, 41)',
        color: 'rgb(214, 222, 235)',
      }}
    >
      {props.frontmatter.title}
    </div>
  )
}
