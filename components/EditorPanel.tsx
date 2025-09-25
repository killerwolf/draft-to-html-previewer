import type React from "react";
import { useId } from "react";
import { ClearIcon, PasteIcon } from "./icons";

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onPasteSample: () => void;
  error: string | null;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  value,
  onChange,
  onClear,
  onPasteSample,
  error,
}) => {
  const textareaId = useId();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor={textareaId}
          className="text-lg font-semibold text-slate-300"
        >
          Draft.js JSON Input - Paste Your Content State
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onPasteSample}
            className="flex items-center px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-900/50 rounded-md hover:bg-cyan-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            title="Paste Sample Data"
          >
            <PasteIcon className="w-4 h-4 mr-1.5" />
            Sample
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-900/50 rounded-md hover:bg-rose-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            title="Clear Editor"
          >
            <ClearIcon className="w-4 h-4 mr-1.5" />
            Clear
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col bg-slate-800 rounded-lg shadow-lg border border-slate-700 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all duration-300">
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your Draft.js content state JSON here... (e.g., from editorState.getCurrentContent().toJS())"
          className={`w-full h-full flex-grow p-4 bg-transparent text-slate-300 font-mono text-sm resize-none rounded-lg focus:outline-none placeholder-slate-500 ${error ? "border-rose-500/50" : "border-transparent"}`}
          style={{ minHeight: "50vh" }}
          spellCheck="false"
        />
      </div>
      {error && (
        <div className="mt-2 p-3 bg-rose-900/50 border border-rose-700 text-rose-300 text-sm rounded-md font-mono">
          {error}
        </div>
      )}
    </div>
  );
};
