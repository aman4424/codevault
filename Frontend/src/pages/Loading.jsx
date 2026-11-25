
const Loading = ({ className = "h-screen" }) => {
  return (
    <div className={`flex gap-3 justify-center items-center ${className}`} role="status">
           <div className=' h-5 w-5 border-2 border-border border-t-primary rounded-full animate-spin '>

            </div>
            Loading...
        </div>
  )
}

export default Loading
