import {NavLink} from 'react-router-dom'
import {useStore} from '../store'


function Header(){
    const {setState} = useStore();

    const showModal = () => setState((oldState) => {
        return {
            ...oldState,
            showNoteForm: true
        }
    })

        
    return (
        <header className="flex flex row justify-between items-center">
            <h3>Making Notes</h3>
            <nav>
                <NavLink to="/" className="ph2">Home</NavLink>
                <button onClick={showModal} className="ph2 create-btn">Create Note</button>
            </nav>
        </header>
    )
}

export default Header