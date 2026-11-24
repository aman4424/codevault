import logo from "../../assets/notebook.svg";
import Options from "./Options";
const NotebookCard = ({title,description,createdAt,lastVisitedAt,totalEntries,_id,setEditingNotebook}) => {
  return (
    <div className='h-60 relative rounded-2xl w-auto max-sm:w-full max-sm: bg-card shadow  flex flex-col gap-5 p-2 border border-muted hover:scale-101 hover:cursor-pointer hover:border-primary hover:shadow-primary active:scale-101 active:cursor-pointer active:border-primary active:shadow-primary ' id={_id}>
        {/* options */}
        <div className="absolute right-1 top-1 hover:bg-white/50 rounded-full  ">
            <Options notebook={{title,description,createdAt,lastVisitedAt,totalEntries,_id}} setEditingNotebook={setEditingNotebook}/>
        </div>

        {/* logo title and description */}
        <div className='flex gap-4 w-full'> 
            <div className='w-1/4 h-25 min-w-25 rounded-2xl bg-muted p-2 '>
                <img src={logo} alt="Notebook" className='object-contain w-full h-full' />
            </div>
            <div className='flex-1 min-w-0'>
            {/* title */}
                <h1 className="text-2xl leading-6 line-clamp-3 max-h-18 mb-1 min-h-10 h-auto" title={title}>
                 {title}
                 </h1>
                <h2 className='text-muted truncate' title={description}>
                    {description}
                </h2>
            </div>
        </div>
        {/* date and totol entries */}
        <div>
            <h2>Created on :<span className='text-muted'>{new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
})}</span></h2>
            <h2>Last Visited: <span className="text-muted">
        {lastVisitedAt
            ? new Date(lastVisitedAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            })
            : "Not visited yet"}
    </span> </h2>
            <h2>Total Entries: <span className='text-muted'>{totalEntries}</span></h2>
        </div>
    </div>
  )
}

export default NotebookCard
