import React from 'react'

export default function Chip({name, className}) {
  return (
	<li className={`${className ? className : ""} rounded-full p-1 px-2 w-max text-xs`}>
		{name}
	</li>
  )
}
