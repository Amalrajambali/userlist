import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as React from 'react'
import { UsersContext } from '../../../context/AppContext'
import { sp } from '../../../auth';

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

interface IUserdata {
    phone: number;
    Id?: number,
    name: string,
    department: string,
    designation: string
    city: string,
    email: string,
}

interface RouteParams {
    id: string;
}



function SingleUser() {

    const [isUpdate, isSetUpdated] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams<RouteParams>();
    const context = useContext(UsersContext);

    const [currentUser, setCurrentUser] = useState<IUserdata>()


    const getSingleUser = async () => {
        const item: any = await sp.web.lists.getByTitle("users").items.getById(+id)();
        setCurrentUser(item)
    }

    useEffect(() => {
        getSingleUser();
    }, [id])


    const deleteUserHandler = async () => {
        const list = await sp.web.lists.getByTitle("users");
        list.items.getById(+id).delete();

        const deletedUser = context.userData.filter(user => user.Id !== +id)
        context.setUserData(deletedUser);
        navigate("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        const { name: key, value } = e.target;
        setCurrentUser({ ...currentUser, [key]: value});

    }

    const editUserHandler =async () => {
        console.log(currentUser);
        const list = await sp.web.lists.getByTitle("users");
        await list.items.getById(+id).update({
           name:currentUser.name,
           department:currentUser.department,
           designation:currentUser.designation,
           email:currentUser.email,
           phone:currentUser.phone,
           city:currentUser.city
          });
          context.getAllUsers();
          isSetUpdated(false)
    }


    return (
        <div className="" style={{}} >
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-3 gradient-custom text-center text-white"
                                        style={{
                                            borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem", backgroundColor: "steelblue",
                                            borderRadius: "2px"
                                        }}>
                                        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/avatar-1579-1128981.png?f=webp&w=128"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "100px" }} />
                                        <h5>{currentUser?.name}</h5>
                                        <p>{currentUser?.designation}</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-4">

                                            {!isUpdate ?
                                                <>
                                                    <h6>Information</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Department</h6>
                                                            <p className="text-muted">{currentUser?.department}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>City</h6>
                                                            <p className="text-muted">{currentUser?.city}</p>
                                                        </div>
                                                    </div>
                                                    <h6>Contact</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Email</h6>
                                                            <p className="text-muted">{currentUser?.email}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Phone</h6>
                                                            <p className="text-muted">{currentUser?.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <button type="button" className="btn btn-danger" onClick={deleteUserHandler}>Delete</button>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <button type="button" className="btn btn-warning" onClick={() => isSetUpdated(true)}>Edit</button>
                                                    </div>
                                                </div>
                                                </>
                                                : <form>
                                                <div className="form-group">
                                                  <label >Email address</label>
                                                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={currentUser.email} name='email' onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                  <label >City</label>
                                                  <input type="text" className="form-control" id="exampleInputPassword1" placeholder="City" value={currentUser.city} name="city" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                  <label >Department</label>
                                                  <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Department" value={currentUser.department} name="department" onChange={handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                  <label >Phone</label>
                                                  <input type="number" className="form-control" name="phone" id="exampleInputPassword1" placeholder="Phone" value={currentUser.phone} onChange={handleChange}/>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <button type="button" className="btn btn-secondary" onClick={() => isSetUpdated(false)}>cancel</button>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <button type="button" className="btn btn-success" onClick={editUserHandler}>save</button>
                                                    </div>
                                                </div>
                                              </form>}



                                            <div className="d-flex justify-content-start">
                                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default SingleUser