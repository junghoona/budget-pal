import React, { useState } from 'react';

function FilterDropdown({ name }) {
    const [dropdown, setDropdown] = useState(false);

    return(
        <div className="relative inline-block text-left">
            <div>
                <button 
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5
                    bg-white px-8 py-2 text-sm font-semibold text-gray-400
                    shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                    transition-all duration-150 ease-in-out"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setDropdown((prev) => !prev)}
                >
                {name}
                <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10
                        11.168l3.71-3.938a.75.75 0 111.08
                        1.04l-4.25 4.5a.75.75 0 01-1.08
                        0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" 
                    />
                </svg>
                </button>
            </div>
            <div 
                className={`${dropdown ? 'absolute' : 
                'hidden'} right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
            >
                <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Duplicate</a>
                </div>
                <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Archive</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Move</a>
                </div>
                <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</a>
                </div>
                <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</a>
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;