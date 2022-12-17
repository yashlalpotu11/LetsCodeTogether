import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar() {
    const title = "<LetsCodeTogether/>"
    return (
        <>
            <div className="container-fluid nav_bg">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <NavLink className="navbar-brand fs-4 mx-3 font-monospace" to="/"> {title}</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mx-5">
                                <li className="nav-item mx-3">
                                    <NavLink exact activeClassName="active_tab" className="nav-link" to="/">Home </NavLink>
                                </li>


                                <li className="nav-item mx-3">
                                    <NavLink exact activeClassName="active_tab" className="nav-link" to="/create">Create room</NavLink>
                                </li>

                                <li className="nav-item mx-3">
                                    <NavLink exact activeClassName="active_tab" className="nav-link" to="/join">Join room</NavLink>
                                </li>
                                
                                <li className="nav-item mx-3 " >
                                    <NavLink exact activeClassName="active_tab" className="nav-link" to="/about">About developer</NavLink>
                                </li>
                            </ul>

                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Navbar