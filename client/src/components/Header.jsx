import {NavLink} from 'react-router-dom'


function Header({setShowNoteForm}){

    const showModal = () => setShowNoteForm(true)
        

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