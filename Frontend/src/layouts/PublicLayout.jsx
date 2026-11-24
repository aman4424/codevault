
import {useEffect} from 'react'
import useViewSidePanel from '../hooks/useViewSidePanel'
import {Children} from 'react'
const PublicLayout = ({children}) => {
  const {viewSidePanel,setViewSidePanel}=useViewSidePanel()
   const [child1, child2] = Children.toArray(children)
  useEffect(() => {
    const handleEscape=(e)=>{
          if(e.key==="Escape"&&viewSidePanel){
            setViewSidePanel(false);
          }
      };
     window.addEventListener("keydown", handleEscape);

  return () => {
    window.removeEventListener("keydown", handleEscape);
  };
  }, [viewSidePanel,setViewSidePanel])
  
  return (
    // sidebar + main content area
    <div className="relative flex h-full gap-1 m-1">

      {/* sidebar backdrop for max-sm */}
      <div 
        className={`
          h-full rounded flex flex-col gap-2 overflow-y-auto
          max-sm:absolute max-sm:inset-0 max-sm:z-50 max-sm:w-full
          transition-transform duration-300

          bg-black/60 backdrop-blur-sm
          transition-opacity duration-200
          
          ${
            viewSidePanel
              ? "opacity-100 delay-300 pointer-events-auto"
              : "opacity-0 delay-0 pointer-events-none"
          }

          ${
            viewSidePanel === true
              ? "translate-x-0 w-1/4 min-[803px]:min-w-[275px] backdrop-blur-sm"
              : "-translate-x-full w-0"
          }
        `}
        onClick={() => {
          setViewSidePanel(false)
        }}
      >
        {/* sidebar content area */}
        <div
          className="max-sm:w-4/5 bg-surface h-full rounded w-full"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {/* sidebar child goes here */}
          {child1}
        </div>
      </div>

      <div
        className={` min-w-3/4 w-full h-full overflow-y-auto bg-surface rounded border-white ${
          viewSidePanel === false ? "w-full" : ""
        } ${viewSidePanel ? "overflow-hidden" : "overflow-y-auto"}`}
      >
        {/* main content goes here */}
        
        {child2}
      </div>

    </div>
  )
}

export default PublicLayout
