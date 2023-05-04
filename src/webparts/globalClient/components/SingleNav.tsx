import * as React from 'react'

function SingleNav({setIsProfile}:any) {
  return (
    <div className='row' style={{width:"500px",paddingTop:"10px"}}>
        <div className='col-md-4'>
        <button type="button" className="btn btn-primary" style={{width:"100%"}} onClick={()=>setIsProfile(true)}>Profile</button>
        </div>
        <div className='col-md-4'>
        <button type="button" className="btn btn-primary" style={{width:"100%"}} onClick={()=>setIsProfile(false)}>Documents</button>
        </div>
        
    </div>
  )
}

export default SingleNav