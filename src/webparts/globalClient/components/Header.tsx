import { Link } from "react-router-dom";
import * as React from 'react'

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "deepskyblue" }}>
                <Link to="/">
                    <a className="navbar-brand" href="#" style={{ color: "white" }}>User Management</a>
                </Link>
            </nav>
        </div>
    )
}

export default Header;