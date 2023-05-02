import { useState, ReactNode, useEffect } from 'react'
import { createContext } from 'react'
// import React from 'react';
import * as React from 'react'
import { sp } from '../auth';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


interface IUserdata {
  Id?:number;
  name: string;
  department: string,
  designation: string
  city: string,
  email: string,
  phone:number
}
interface ISearchData {
  name: string,
  department: string,
  designation: string
  city: string,
  email: string,
  phone:number
}

interface MyContextType {
  userData: IUserdata[],
  setUserData: React.Dispatch<React.SetStateAction<IUserdata[]>>,
  search: ISearchData[],
  setSearch: React.Dispatch<React.SetStateAction<ISearchData[]>>,
  getAllUsers:Function
}




export const UsersContext = createContext<MyContextType | null>(null)

function AppContext({ children }: { children: ReactNode }) {

  // const data = JSON.parse(localStorage.getItem("users") || "[]")

  let data;
  const [userData, setUserData] = useState<IUserdata[]>(data);

  const getAllUsers = async () => {
    data = await sp.web.lists.getByTitle("users").items()
    setUserData(data)
  }

  useEffect(() => {
    getAllUsers()
  }, [userData])


  const [search, setSearch] = useState<ISearchData[]>([]);


  return <UsersContext.Provider value={{ userData, setUserData, search, setSearch ,getAllUsers}}>
    {children}
  </UsersContext.Provider>
}

export default AppContext