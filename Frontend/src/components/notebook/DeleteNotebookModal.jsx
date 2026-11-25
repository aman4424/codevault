import { useState } from "react";
import { deleteNotebook } from "../../services/notebookApi";
import { Trash } from "lucide-react";
const DeleteNoteBookModal  = ({notebook,setNotebook,setQueryParams}) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const submit=async(e)=>{
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);
        try {
            await deleteNotebook(notebook._id);
            setQueryParams((prev)=>({...prev,
            }))
            setNotebook(null);
        } catch (error) {
            console.error("Failed to delete notebook", error);
            setErrorMessage(error.response?.data?.message || "Failed to delete notebook.");
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
     <div className="
        fixed bg-black/60
        backdrop-blur-sm
        z-[200] 
        flex items-end justify-center
        inset-0 
        sm:absolute sm:inset-0
        sm:flex
        sm:justify-center
        sm:items-center
        
     "
     onClick={()=>{setNotebook(null)}}
     >
        <div className="
        w-[95%] max-w-lg
        max-h-[70%]
        overflow-y-auto
        bg-[#131F36]
        border border-[#263754]
        rounded-2xl
        p-6
        shadow-2xl
      "
      onClick={(e)=>{e.stopPropagation()}}
      >
        <div className="mb-6 flex flex-col gap-2">
            <div>
                <div className="bg-red-600/20 w-fit p-2 rounded-xl">
                <Trash color="red" />
            </div>
          <h2 className="text-xl font-semibold text-slate-100">Delete notebook?</h2>
            </div>
          <p className="text-sm text-slate-400 mt-1">
            Are you sure you want to delete " <span className="text-white font-bold ">{notebook.title}</span> "?
          </p>
          <p className="text-red-600 ">
                This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-5">
            {errorMessage&&<p role="alert" className="text-red-600">{errorMessage}</p>}
            <button className="text-slate-200 hover:text-white hover:cursor-pointer "
                onClick={()=>setNotebook(null)} disabled={isSubmitting}
            >Cancel</button>
             <button className="bg-red-500 p-2 rounded hover:bg-red-400 hover:cursor-pointer"
             onClick={submit} disabled={isSubmitting}
             > {isSubmitting?"Deleting Notebook...":"Delete Notebook"}</button>
        </div>
             
       
      </div>
     </div>   
  )
}

export default DeleteNoteBookModal 
