import DropButton from './buttondown'
import './style.css'

export function AppBar(props) {
    const {state, dispatch} = props;
    return(
        <div className="div-header">
            <div className='div-logo'>
                <h1 className='title-logo'>{JSON.parse(localStorage.getItem('auth'))?.username.toUpperCase()}, Dashboard</h1>
            </div>
            <DropButton state={state} dispatch={dispatch} />
        </div>
    )
}

export default AppBar

