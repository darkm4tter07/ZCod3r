import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../Constants.js";

const languages = Object.entries(LANGUAGE_VERSIONS);
const CodeEditor = () => {
  const [code, setCode] = useState("// code here");
  const [language, setlanguage] = useState("javascript");
  
  return (
    <div className="h-[90vh] flex-col p-4">
      <div className="flex justify-between">
        <div>
          <select
            className="m-2 border-2 border-black rounded-lg p-1"
            onChange={(e) => setlanguage(e.target.value)}
          >
            {languages.map((lang, index) => (
              <option key={index} value={lang[0]}>
                {lang[0]}
              </option>
            ))}
          </select>
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
        height="60%"
      />
    </div>
  );
};

export default CodeEditor;
