import { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../../context/AppContext";
import * as React from 'react'
//import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { sp } from "../../../auth";

let initialState = {
    name: "",
    email: "",
    department: "",
    designation: "",
    city: "",
    Title: "",
    phone:0
}


function AddUser() {

    const context = useContext(UsersContext)

    const navigate = useNavigate();

    const [form, setForm] = useState(initialState)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.name) {
            await sp.web.lists.getByTitle("users").items.add(form)
            // localStorage.setItem("users", JSON.stringify(context?.userData))
            context?.userData.push(form)
            navigate("/")
        }
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name: key, value } = e.target;
        setForm({ ...form, [key]: value, Title: "user" });

    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="row" style={{ paddingTop: "58px" }}>

                <div className="col-md-3" style={{ marginRight: "10px", marginTop: "10px" }} >
                    <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt="Card image cap" />
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="" placeholder="Name" name="name" onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputPassword" placeholder="E-mail" name="email" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Department</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" placeholder="Department" name="department" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Designation</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" placeholder="Designation" name="designation" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" placeholder="City" name="city" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="inputPassword" placeholder="Phone" name="phone" onChange={handleChange} />
                        </div>
                    </div>


                    <div className="row">
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "12px" }}>Submit</button>
                    </div>

                </div>
            </div>
        </form>


    )
}

export default AddUser;