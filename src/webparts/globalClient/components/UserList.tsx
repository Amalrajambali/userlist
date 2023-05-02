import { useContext } from "react"
import { Link } from "react-router-dom";
import { UsersContext } from "../../../context/AppContext";
import * as React from 'react'



interface IUserdata {
    Id: string,
    name: string,
    department: string,
    designation: string
    city: string,
    email: string,
    phone:number
}


function UserList() {

    const context = useContext(UsersContext)

    if (!context) return null
    const { search, userData } = context

    
    let data: any = search.length != 0 ? search :  userData

    const renderUsers = data?.map((user: IUserdata) => {
        return (
            <div className="card col-md-3" style={{ marginRight: "10px", marginTop: "26px", textDecoration: "none" }} >
                <Link to={`/user/${user.Id}`}>
                    <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <div className="cardData">
                            <p className="card-text"> <b>Designation :</b>  {user.designation}</p>
                            <p className="card-text"> <b>Department:</b>  {user.department}</p>
                            <p className="card-text"> <b>City : </b>{user.city}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })


    return (
        <div className="row">
            {renderUsers}
        </div>
    )
}

export default UserList;