
import React, { useState, useEffect } from 'react';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { Header } from './components/Header';
import { SAMPLE_DRAFT_JSON } from './constants';

// Since we are loading draftjs-to-html from a CDN, we need to declare it on the window object for TypeScript.
declare global {
    interface Window {
        draftToHtml: (rawContentState: any, hashtagConfig?: any, directional?: boolean, customEntityTransform?: any) => string;
    }
}

const App: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>(SAMPLE_DRAFT_JSON);
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(typeof window.draftToHtml === 'function');

    // Effect to check for the library loading
    useEffect(() => {
        if (isLibraryLoaded) {
            return;
        }

        const intervalId = window.setInterval(() => {
            if (typeof window.draftToHtml === 'function') {
                setIsLibraryLoaded(true);
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [isLibraryLoaded]); // This effect runs once until the library is loaded.

    // Effect to perform the conversion
    useEffect(() => {
        if (!isLibraryLoaded) {
            setError("Editor library is loading...");
            setHtmlOutput('');
            return;
        }

        if (!jsonInput.trim()) {
            setHtmlOutput('');
            setError(null);
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonInput);

            if (typeof parsedJson !== 'object' || parsedJson === null || !Array.isArray(parsedJson.blocks)) {
                throw new Error("Invalid Draft.js structure. Missing 'blocks' array.");
            }

            const convertedHtml = window.draftToHtml(parsedJson);
            setHtmlOutput(convertedHtml);
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(`Error: ${e.message}`);
            } else {
                setError("An unknown error occurred during parsing or conversion.");
            }
            setHtmlOutput('');
        }
    }, [jsonInput, isLibraryLoaded]); // Re-run when input changes or library loads.


    const handleClear = () => {
        setJsonInput('');
    };
    
    const handlePasteSample = () => {
        setJsonInput(SAMPLE_DRAFT_JSON);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <EditorPanel
                        value={jsonInput}
                        onChange={setJsonInput}
                        onClear={handleClear}
                        onPasteSample={handlePasteSample}
                        error={error}
                    />
                    <PreviewPanel html={htmlOutput} />
                </div>
                 <footer className="text-center text-slate-500 mt-12 text-sm">
                    <p>Built with React, TypeScript, and Tailwind CSS.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
