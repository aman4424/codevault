import { useState } from "react";
import { updateNotebook } from "../../services/notebookApi";
const UpdateNoteBookModal  = ({notebook,setNotebook,setQueryParams}) => {
    const [title , setTitle ] = useState(notebook.title||"");
    const [description, setDescription] = useState(notebook.description||"");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const submit=async(e)=>{
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);
        try {
            await updateNotebook(notebook._id, 
{ title, description });
            setQueryParams((prev)=>({...prev,
            }))
            setNotebook(null);
        } catch (error) {
            console.error("Failed to update notebook", error);
            setErrorMessage(error.response?.data?.message || "Failed to update notebook.");
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-100">Update notebook</h2>
          <p className="text-sm text-slate-400 mt-1">
            Update your notes field.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="title">
              Notebook Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Data Structures and Algorithms"
              className="
                w-full rounded-lg
                bg-[#0D172B]
                border border-[#263754]
                px-3 py-3
                text-slate-100
                placeholder:text-slate-500
                outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you organize in this notebook?"
              rows={3}
              className="
                w-full rounded-lg
                bg-[#0D172B]
                border border-[#263754]
                p-3
                text-slate-100
                placeholder:text-slate-500
                outline-none resize-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20
              "
            />
          </div>

          {errorMessage && <p role="alert" className="text-sm text-red-400">{errorMessage}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setNotebook(null)}
              className="rounded-lg px-4 py-2.5 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Notebook"}
            </button>
          </div>
        </form>
      </div>
     </div>   
  )
}

export default UpdateNoteBookModal 
