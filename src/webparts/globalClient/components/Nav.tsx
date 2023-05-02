import { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../../context/AppContext";
import * as React from 'react'


function Nav() {

    const context = useContext(UsersContext)
    if (!context) return null
    const { userData, setSearch } = context

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const text = e.target.value.toLowerCase();
        const searchItems=userData.filter(user => user.name.toLowerCase().includes(text))
        setSearch(searchItems)
        
    }

    return (
        <div className="nav-adduser">

            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ marginLeft: "58px" }} onChange={handleChange} />
            </form>

            <button className="btn btn-outline my-2 my-sm-0" type="submit" style={{ backgroundColor: "deepskyblue" }}><Link to="/adduser" style={{ color: "white" }}>Add user</Link></button>

        </div>
    )
}

export default Nav;