import DropButton from './buttondown'
import './style.css'

export function AppBar() {
    return(
        <div className="div-header">
            <div className='div-logo'>
                <h1 className='title-logo'>{JSON.parse(localStorage.getItem('auth')).username.toUpperCase()}, Dashboard</h1>
            </div>
            <DropButton />
        </div>
    )
}

export default AppBar

