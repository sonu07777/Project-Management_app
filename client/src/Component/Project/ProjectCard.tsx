import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ data }) {
    const navigate = useNavigate();

  console.log(data);
  return (
    <div className="m-5" onClick={()=>{
      navigate("/Description",{state:{...data}})
    }}>
      <div className="bg-gray-100 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{data?.title}</h3>
          <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
            {data?.projectStatus}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{data?.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="bg-gray-200 px-2 py-1 rounded">
            {data?.category}
          </span>
          {/* <span className="flex items-center gap-1"> */}
          {/* 📅 {new Date(data.endDate).toISOString().split("T")[0]} */}
          <span className="flex items-center gap-1">
            📅{" "}
            {data?.endDate
              ? new Date(data.endDate).toISOString().split("T")[0]
              : "No deadline"}
          </span>
          {/* </span> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
