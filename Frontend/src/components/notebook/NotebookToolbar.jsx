import { ListSortDescending } from 'lucide-react';
import { useState } from 'react';

const NotebookToolbar = ({queryParams,setQueryParams}) => {
    const [showSortingModal, setShowSortingModal] = useState(false);
    const [name, setName] = useState("Recently visited");
    const handleChange=(value)=>{
        if(value=='Recently visited'){
            setName('Recently visited');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'lastVisitedAt',
                order:"desc"
            }))
        }
        else if(value=='Recently created'){
            setName('Recently created');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'createdAt',
                order:"desc",
                page:1
            }))
        }
        else if(value=='Recently updated'){
            setName('Recently updated');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'updatedAt',
                order:"desc",
                page:1
            }))
        }
        else if(value=='Oldest first'){
            setName('Oldest first');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'createdAt',
                order:"asc",
                page:1
            }))
        }
        else if(value=='Name: Z to A'){
            setName('Name: Z to A');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'title',
                order:"desc",
                page:1
            }))
        }
        else if(value=='Name: A to Z'){
            setName('Name: A to Z');
            setQueryParams(queryParams=>({
                ...queryParams,
                sortBy:'title',
                order:"asc",
                page:1
            }))
        }
    }
  return (
    <div>
        <button className="h-6 flex rounded-2xl bg-card relative py-1 px-2 items-center border hover:cursor-pointer hover:shadow hover:shadow-primary"
            onClick={()=>setShowSortingModal(prev=>!prev)}
        >
        <ListSortDescending className='h-full'/>
        {name}
        {
           showSortingModal&&
            <div className=' w-40 right-1 rounded-xl absolute bg-surface top-5 border-border '>
                <ul>
                    <li onClick={()=>{handleChange('Recently visited')}} className='border-b border-border'>Recently visited</li>
                    {/* <hr  /> */}
                    <li onClick={()=>{handleChange('Recently created')}} className='border-b border-border' >Recently created</li>
                    {/* <hr /> */}
                    <li onClick={()=>{handleChange('Recently updated')}} className='border-b border-border'>Recently updated</li>
                    {/* <hr /> */}
                    <li onClick={()=>{handleChange('Oldest first')}} className='border-b border-border'>Oldest first</li>
                    {/* <hr /> */}
                    <li onClick={()=>{handleChange('Name: A to Z')}} className='border-b border-border'>Name: A to Z</li>
                    {/* <hr /> */}
                    <li onClick={()=>{handleChange('Name: Z to A')}} >Name: Z to A</li>
                    
                </ul>
            </div>
        }
    </button>
    </div>
  )
}

export default NotebookToolbar
