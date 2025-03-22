import { useEffect, useState } from "react"
import { PostData, updateData } from "./PostApi";

export const Form = ({data,setData,updateDataApi,setUpdateDataApi}) =>{

 const [addData,setAddData] = useState({
        title:"",
        body:"",
    })

    let isEmpty = Object.keys(updateDataApi).length==0;

    useEffect(()=>{
      updateDataApi && 
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      })
    },[updateDataApi])

    const handlePost = (e) =>{
     const name=e.target.name;
     const value=e.target.value;

     setAddData((prev)=>{
        return {
        ...prev,
        [name]:value
        }
     })
    }

    const addPostData = async () =>{
        const res = await PostData(addData);
        console.log("res",res);

        if(res.status === 201){
            setData([...data,res.data]);
        }
    }

    const updatePostData =async () =>{
      try {
        const res = await updateData(updateDataApi.id, addData)
        console.log(res);
        console.log(res);

        if(res.status === 200){
          setData((prev)=>{
            return prev.map((curElem)=>{
              return curElem.id === res.data.id ? res.data : curElem;
            })
          })

          setAddData({title:"", body:""})
          setUpdateDataApi({})
        }
         
      } catch (error) {
        console.log(error)
      }
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        addPostData();
        const action=e.nativeEvent.submitter.value;
        if(action==="Add"){
          addPostData();
        }else if(action==="Edit"){
          updatePostData();
        }
    }

  return(
    <>
   <form onSubmit={handleFormSubmit}>
   <input type="text" className="input" name="title" value={addData.title} onChange={handlePost}/>
   <input type="text" className="input" name="body" value={addData.body} onChange={handlePost}/>
   <button className="btn" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
   </form>
    </>
  ) 
}


