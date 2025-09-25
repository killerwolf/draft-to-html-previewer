import type React from "react";
import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

interface PreviewPanelProps {
  html: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ html }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-slate-300">
          HTML Preview - Live Output
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!html}
          className="flex items-center px-3 py-1.5 text-xs font-medium bg-slate-700 rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4 mr-1.5 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4 mr-1.5" />
              Copy HTML
            </>
          )}
        </button>
      </div>
      <div
        className="prose-custom flex-grow bg-white text-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 overflow-auto"
        style={{ minHeight: "50vh" }}
      >
        {html ? (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is intentional for displaying user-provided HTML content
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">HTML Preview Ready</p>
              <p className="text-sm">
                Paste your Draft.js JSON to see the converted HTML output
              </p>
            </div>
          </div>
        )}
      </div>
      <style>{`
                .prose-custom {
                    max-width: none;
                }
                .prose-custom h1 { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
                .prose-custom h2 { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
                .prose-custom h3 { font-size: 1.17em; font-weight: bold; margin-top: 1em; margin-bottom: 1em; }
                .prose-custom h4 { font-size: 1em; font-weight: bold; margin-top: 1.33em; margin-bottom: 1.33em; }
                .prose-custom h5 { font-size: 0.83em; font-weight: bold; margin-top: 1.67em; margin-bottom: 1.67em; }
                .prose-custom h6 { font-size: 0.67em; font-weight: bold; margin-top: 2.33em; margin-bottom: 2.33em; }
                .prose-custom p { margin-top: 1em; margin-bottom: 1em; }
                .prose-custom a { color: #0891b2; text-decoration: underline; }
                .prose-custom ul { list-style-type: disc; margin-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .prose-custom ol { list-style-type: decimal; margin-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
                .prose-custom li { margin-top: 0.5em; margin-bottom: 0.5em; }
                .prose-custom blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; margin: 1.5em 0; color: #475569; }
                .prose-custom pre { background-color: #f1f5f9; padding: 1rem; border-radius: 0.25rem; overflow-x: auto; }
                .prose-custom code { font-family: monospace; }
            `}</style>
    </div>
  );
};
