
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Draft.js JSON Previewer
            </h1>
            <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                Instantly visualize your Draft.js raw content state. Paste your JSON in the editor to see a live HTML preview.
            </p>
        </header>
    );
};
