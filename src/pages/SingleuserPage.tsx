import * as React from 'react'
import { useState } from 'react'
import SingleUser from '../webparts/globalClient/components/SingleUser'
import SingleNav from '../webparts/globalClient/components/SingleNav'

function SingleuserPage() {
  const[isProfile,setIsProfile] =useState(true);

  
  return (
    <div style={{backgroundColor:"rgb(244, 245, 247)",zIndex:"9999999"}}>
      <SingleNav setIsProfile={setIsProfile}/>
      <SingleUser  isProfile={isProfile}/>
    </div>
  )
}

export default SingleuserPage