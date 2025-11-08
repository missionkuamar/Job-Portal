import React from 'react'
import { LatesJobCards} from './LatesJobCards'
import { useSelector } from 'react-redux'



export const LatestJobs = () => {
  const { alljobs } = useSelector(store => store.job || []);
  return (
    <div className='max-w-7xl mx-auto my-20'>
    <h1 className='text-4xl font-bold'><span className='text-[#6a38c2]'>Latest & Top </span> Job Opening </h1>
    {/* crads */}
    <div className=' grid grid-cols-3 gap-4 my-5'>
        {
          alljobs.length < 0 ? <span> No Job Available</span> : alljobs.slice(0, 6).map((job,) => <LatesJobCards key={job._id} job={job} />)
        }
    </div>
    </div>
  )
}
