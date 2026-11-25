import { useEffect, useState } from "react";
import NotebookCard from "../components/notebook/NotebookCard"
import { getNotebooks } from "../services/notebookApi";
import Loading from "./Loading";
import NotebookToolbar from "../components/notebook/NotebookToolbar";
import CreateNotebookButton from "../components/notebook/CreateNotebookButton";
import CreateNotebookModal from "../components/notebook/CreateNotebookModal";
import UpdateNoteBookModal from "../components/notebook/UpdateNotebookModal";
import DeleteNoteBookModal from "../components/notebook/DeleteNotebookModal";
import Pagination from "../components/notebook/Pagination";
const NoteBookPage = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({
    page:1,
    limit:10,
    order:"desc",
    sortBy:"lastVisitedAt",
    search:""
  })
  const [showCreateNotebookModal, setShowCreateNotebookModal] = useState(false)
  const [editingNotebook, setEditingNotebook] = useState(null);
  const [deletingNotebook, setDeletingNotebook] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchNotebooks=async()=>{
      try {
            setLoading(true);
            const response = await getNotebooks(queryParams);
            if (!isCurrentRequest) return;

            setTotalPages(response.data.pagination.totalPages);
            
            setNotebooks(response.data.notebooks);
            
        } catch (error) {
            if (isCurrentRequest) {
              console.error(error);
            }
        }
        finally {
            if (isCurrentRequest) {
              setLoading(false);
            }
        }
    }
    console.log("useEffect executed");
    fetchNotebooks()

    return () => {
      isCurrentRequest = false;
    };
  }, [queryParams])
  

  return (
    <div className={`relative h-full ${showCreateNotebookModal ? "overflow-hidden" : ""}`}>

        {/* Modals */}
        {showCreateNotebookModal&& <CreateNotebookModal setQueryParams={setQueryParams} setShow={setShowCreateNotebookModal}/>}
        {editingNotebook &&<UpdateNoteBookModal notebook={editingNotebook} setNotebook={setEditingNotebook}setQueryParams={setQueryParams} />}
        {deletingNotebook&&<DeleteNoteBookModal notebook={deletingNotebook} setNotebook={setDeletingNotebook} setQueryParams={setQueryParams}/>}
        <div className="sticky w-full py-2  top-0 left-0 bg-surface z-20 flex justify-between px-2">
          <h1>Notebooks</h1>
          <div className="flex gap-2">
            <NotebookToolbar setQueryParams={setQueryParams} queryParams={queryParams}/>
            <CreateNotebookButton   setShow={setShowCreateNotebookModal}/>
          </div>
        </div>


    <div className="relative min-h-[15rem]">
      {loading && (
        <div className="absolute inset-0 z-10 bg-surface/70">
          <Loading className="h-full" />
        </div>
      )}
      <div className="
        grid
        grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
        gap-5
        w-full
        p-4
      ">
        {notebooks.map((notebook) => (
          <NotebookCard
            title={notebook.title}
            description={notebook.description}
            lastVisitedAt={notebook.lastVisitedAt}
            createdAt={notebook.createdAt}
            totalEntries={notebook.totalEntries}
            key={notebook._id}
            _id={notebook._id}
            setEditingNotebook={setEditingNotebook}
            setDeletingNotebook={setDeletingNotebook}
          />
        ))}
      </div>
    </div>
    <Pagination
  totalPages={totalPages}
  currentPage={queryParams.page}
  setQueryParams={setQueryParams}
/>
    </div>
  )
}

export default NoteBookPage
