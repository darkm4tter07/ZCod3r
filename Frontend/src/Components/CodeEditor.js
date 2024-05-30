import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../Constants.js";

const languages = Object.entries(LANGUAGE_VERSIONS);
const CodeEditor = () => {
  const [code, setCode] = useState("// code here");
  const [language, setlanguage] = useState("javascript");
  const [open, setOpen] = useState(false);
  
  return (
    <div className="h-[90vh] w-1/2 flex-col p-4">
      <div className="flex justify-between">
        <div
          className="m-2 border-2 border-black inline-block p-1 uppercase rounded-lg cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {language}
        </div>
        <div className="absolute flex-col z-50 mr-auto ml-2 mt-4">
          {open && (
            <div className={` bg-white border-2 border-black cursor-pointer `}>
              {languages.map(([key, value]) => (
                <div
                  className="p-2 hover:opacity-50"
                  onClick={() => {
                    setlanguage(key);
                    setOpen(false);
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="m-2 border-2 border-black inline-block p-1 uppercase rounded-lg cursor-pointer">
          RUN
        </div>
      </div>

      <Editor
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default CodeEditor;
