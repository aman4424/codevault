import { Plus } from "lucide-react"

const CreateNotebookButton = ({setShow}) => {
  return (
    <button className="bg-primary rounded-full max-sm:size-6 sm:p-1 sm:pr-2 h-6 flex items-center justify-center hover:cursor-pointer hover:shadow hover:shadow-primary"
      title="New Notebook"
      onClick={()=>{setShow(true)}}
    >
      <Plus className="" size={18}/>
      <p className="max-sm:hidden">New Notebook</p>
    </button>
  )
}

export default CreateNotebookButton
