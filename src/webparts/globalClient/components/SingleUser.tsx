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
    imageUrl?:string
}

interface RouteParams {
    id: string;
}



function SingleUser({ isProfile }: any) {

    const [isUpdate, isSetUpdated] = useState(false);
    const[image,setImage]=useState<any|null>(null);

    const fileNamePath = encodeURI(image?.name);

    
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
        setCurrentUser({ ...currentUser, [key]: value });


    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if(file)
        {
            setImage(file)
        }
    };

 
    const editUserHandler = async () => {
        let addedImage
        if(image){
             addedImage= await sp.web.getFolderByServerRelativePath(`usersLibrary/${id}`).files.addUsingPath(fileNamePath, image, { Overwrite: true });
             console.log(addedImage.data.ServerRelativeUrl)
            }
        
        const list = await sp.web.lists.getByTitle("users");
        await list.items.getById(+id).update({
            name: currentUser?.name,
            department: currentUser?.department,
            designation: currentUser?.designation,
            email: currentUser?.email,
            phone: currentUser?.phone,
            city: currentUser?.city,
            imageUrl:addedImage?.data?.ServerRelativeUrl
        });
       
        context.getAllUsers();
        isSetUpdated(false)
    }


    console.log(image)

    return (
        <div className="" >
            {isProfile ?
                <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                    <div className="container py-5 h-100" style={{ position: "relative" }}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-3 gradient-custom text-center text-white"
                                            style={{
                                                borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem", backgroundColor: "steelblue",
                                                borderRadius: "2px"
                                            }}>
                                            <img  src={currentUser?.imageUrl?currentUser.imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqfZBDYOPW8hB6ZYxcx3UZ0mvR-mxH8MABg&usqp=CAU"}
                                                alt="Avatar" className="img-fluid my-5" style={{ width: "100px",borderRadius:"50%" }} />



                                            <h5>{currentUser?.name}</h5>
                                            <p>{currentUser?.designation}</p>
                                            <i className="far fa-edit mb-5"></i>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card-body p-4">



                                                {/* Edit Buttons */}

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
                                                            <label >Add Profile picture</label>
                                                            <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Email address</label>
                                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={currentUser.email} name='email' onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >City</label>
                                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="City" value={currentUser.city} name="city" onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Department</label>
                                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Department" value={currentUser.department} name="department" onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Phone</label>
                                                            <input type="number" className="form-control" name="phone" id="exampleInputPassword1" placeholder="Phone" value={currentUser.phone} onChange={handleChange} />
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

                                                {/* Edit Buttons */}

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
                : "hii"}

        </div>
    )
}

export default SingleUser