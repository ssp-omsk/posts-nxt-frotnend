import React from "react";
import { Card } from "./card";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

const Upload = () => {
  return (
    <div className="border border-dashed border-gray-500 relative rounded-md">
      <input
        onChange={(e) => console.log(e.target.files)}
        type="file"
        multiple
        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
      />
      <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
        <h4>
          Drop files anywhere to upload
          <br />
          or
        </h4>
        <p className="">Select Files</p>
      </div>
    </div>
  );
};

export default Upload;
