import useState from 'react'
import Clicker from './Clicker.jsx'

export default function App() {
    const [ hasClicker, setHasClicker ] = useState(true)

    const toggleClickerClick = () => {
        setHasClicker(!hasClicker)
    }

    return <>
        <button onClick = { toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } clicker</button>
        { hasClicker ? <Clicker /> : null }
    </>
}