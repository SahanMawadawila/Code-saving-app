"use client";
import { useState } from "react";

import type { Snippet } from "@prisma/client"; //we can import type alias from prisma client
import Editor from "@monaco-editor/react";
import submitEditedCode from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handdleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const handleSubmit = submitEditedCode.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handdleEditorChange}
      />

      <form action={handleSubmit}>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </form>
    </div>
  );
}
