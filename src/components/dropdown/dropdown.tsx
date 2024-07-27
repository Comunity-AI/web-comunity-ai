import React, { ReactNode, useEffect, useState } from 'react';

interface ItemDropDown{
  id?:string;
  name: string
  icon?: ReactNode
}

interface DropdownProps {
  label:string;
  items: ItemDropDown[];
  setItem: (item:ItemDropDown) => void;
  className?: string;
}

const Dropdown = ({ label, items, setItem, className }:DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDropDown>(items[0] || {});
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (!selectedItem.name && items.length > 0) {
      setSelectedItem(items[0]);
    }
  }, [items])

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleItemClick = (item:ItemDropDown) => {
    setSelectedItem(item);
    setItem(item)
    setIsOpen(false);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleItemClick(items[highlightedIndex]);
    }
  };

  return (
    <div className={className}>
      <label id="listbox-label" className="block text-lg font-medium leading-6 text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white dark:bg-slate-800 py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-morado sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="listbox-label"
          onClick={toggleMenu}
        >
          <span className="flex items-center">
            {selectedItem.icon}
            <span className="ml-3 block truncate">{selectedItem.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-40 w-full overflow-y-scroll rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
            aria-labelledby="listbox-label"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-200 ${highlightedIndex === index ? 'bg-second-morado text-white' : 'hover:cursor-pointer hover:bg-slate-700'}`}
                id={`listbox-option-${index}`}
                role="option"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center">
                {/* h-5 w-5 flex-shrink-0 rounded-full */}
                  {item.icon}
                  <span className={`ml-3 block truncate ${highlightedIndex === index ? 'font-semibold' : 'font-normal'}`}>
                    {item.name}
                  </span>
                </div>
                {highlightedIndex === index && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-verde-claro">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
