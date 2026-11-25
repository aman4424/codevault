
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

const Options = ({notebook,setEditingNotebook,setDeletingNotebook}) => {
  const [isClicked, setIsClicked] = useState(false);
    
  return (
    <div className="relative">
      <button
        onClick={() => setIsClicked(prev => !prev)}
        className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
      >
        <EllipsisVertical />
      </button>

      {isClicked && (
        <ul className="
          absolute right-0 z-50
          w-max whitespace-nowrap
          rounded-lg bg-surface
          border border-border shadow-lg
          overflow-hidden
        ">
          <li
            className="px-3 py-2 cursor-pointer hover:bg-primary"
            onClick={() =>{
                setEditingNotebook(notebook);
                setIsClicked(false);
            }}
          >
            Update fields
          </li>

          <li
            className="px-3 py-2 cursor-pointer hover:bg-primary"
            onClick={() => {
              setDeletingNotebook(notebook);
              setIsClicked(false);}}
          >
            Delete notebook
          </li>
        </ul>
      )}
    </div>
  );
};

export default Options;
