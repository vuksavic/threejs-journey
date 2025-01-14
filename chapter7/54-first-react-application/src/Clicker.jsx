import { useState } from 'react'

export default function Clicker() {
    const countState = useState(0)
    const count = countState[0]
    const setCount = countState[1]
    console.log(countState)

    const buttonClick = () => {
        setCount(count + 1)
    }

    return <div>
        <div>Clicks count: { count }</div>
        <button onClick={ buttonClick }>Click me</button>
    </div>
}