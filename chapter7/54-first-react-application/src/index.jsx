import { div } from 'three/tsl'
import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

const toto = 'tata'

root.render(
    <div>
        <h1 className="paragraph">Hello React</h1>
        <App />

        <p>Some<br /> content, { Math.random() }</p>

        <label htmlFor="name">ping</label>
        <input id="name" type="checkbox" />
    </div>
)