import { Badge } from "./ui/badge"
import React from 'react'

export const LatesJobCards = ({job}) => {
   
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
            <div>
                <h1 className="font-medium text-lg ">{job?.company}</h1>
                <p className="text-sm text-gray-600">{job?.location}</p>

            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-400">{job?.description}</p>
            </div>
            <div className="flex itmes-center gap-2 mt-4">
                <Badge className={'text-bold-700 font-bold'} variant="ghost">{job?.position} Postion </Badge>
                <Badge className={'text-[#f83002] font-bold'} variant="ghost">{job?.jobType} </Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} </Badge>
            </div>
        </div>
    )
}
