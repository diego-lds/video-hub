import React, { useState } from "react";

// Tipagem para a função onVideoChange
type InputVideoProps = {
  onVideoChange: (file: File | null) => void;
};
const InputVideo: React.FC<InputVideoProps> = ({ onVideoChange }) => {
  return (
    <div className="">
      <div className="border border-slate-700 rounded-lg  hover:border-slate-500">
        <input
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            onVideoChange(file);
          }}
          type="file"
          required
          className="w-full text-sm text-slate-700 hover:text-slate-500
        file:mr-4 file:py-2 file:px-5 file:border-0
         file:text-medium file:rounded-l-md
      file:bg-slate-700 file:text-white
        hover:file:cursor-pointer hover:file:bg-slate-500"
        ></input>
      </div>

      <p className="mt-2 ml-1 text-sm text-stone-700" id="file_input_help">
        Arquivos MP4, máximo 50MB.
      </p>
    </div>
  );
};

export default InputVideo;
