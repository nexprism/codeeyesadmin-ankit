import React from 'react'
import DataTable from "react-data-table-component";
import { useGetAllCompaniesQuery } from '../../redux/features/companyEndPoint';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';


const Comments = () => {
    const org = Cookies.get("organization")
    const [comments,setComments]= useState([])
    const { data, isError, error, isLoading, isFetching, isSuccess,refetch } = useGetAllCompaniesQuery(org);

    useEffect(()=>{
        
        const fetchComments = async ()=>{
            const resp = await fetch(`http://localhost:8000/api/admin/comments/?organization=${org}`,{
                method: 'GET',
                headers: {
                  
                  'Content-Type': 'application/json',
                },
              })
              const data = await resp.json();
              console.log(data)
              const allComments = data.data.map(comment => comment.comments)
              setComments(allComments)
        }
        fetchComments();
    },[])
console.log(comments)
// if(comments.length<1){
//     return <h3>No comments found</h3>
// }
   
        const COLUMNS = [
          {
            name: "#",
            selector: (row, index) => index + serialNumber,
            sortable: true,
          },
          {
            name: "Name",
            sortable: true,
            cell: (row) => row?.user,
          },
          {
            name: "Email",
            sortable: true,
            cell: (row) => row?.email,
          },
          {
            name: "Comment",
            sortable: true,
            cell: (row) => row?.content,
          },
         
          {
            name: "Action",
            cell: (row) => (<>
              <div className="action_icon_wrapper">
                
                <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Delete</Tooltip>}>
                    <Button variant="danger" onClick={() => handleDelete(row?._id)}>
                      <i className="fe fe-trash text-light"></i>
                    </Button>
                  </OverlayTrigger>
              </div>
              </>
            ),
          },
        ];
    
  return (
    <div>
      comments
      {
        
        comments.map(comment =>{
            if(comment.length>0)(
                // comment.map(c=> console.log(c) )
            // console.log(comment)
            <DataTable data={comment} columns={COLUMNS} striped  />
            )
            
})
      }
      
    </div>
  )
}

export default Comments
