import React, { useState } from "react";

// Tipagem para a função onVideoChange
type InputVideoProps = {
  onVideoChange: (file: File | null) => void;
};
const InputVideo: React.FC<InputVideoProps> = ({ onVideoChange }) => {
  return (
    <div className="">
      <div className="border border-stone-400 rounded-lg ">
        <input
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            onVideoChange(file);
          }}
          type="file"
          className="text-sm text-stone-600
        file:mr-5 file:py-2 file:px-5 file:border-0
         file:text-medium file:rounded-l-lg
      file:bg-stone-600 file:text-white
        hover:file:cursor-pointer hover:file:bg-stone-500"
        ></input>
      </div>

      <p className="mt-2 ml-1 text-sm text-stone-700" id="file_input_help">
        Arquivos MP4, máximo 50MB.
      </p>
    </div>
  );
};

export default InputVideo;
