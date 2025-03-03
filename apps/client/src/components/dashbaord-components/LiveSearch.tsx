import { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const LiveSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleSearchShortcut = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                handlSearchClick();
            }
        };

        window.addEventListener("keydown", handleSearchShortcut);
        return () => {
            window.removeEventListener("keydown", handleSearchShortcut);
        };
    }, []);

    const handlSearchClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="max-w-xl flex gap-2 mx-auto p-4">
            <div className="relative border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-myBlue transition-all">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter to get the depth of the context!"
                    className="w-full px-4 py-1.5 outline-none focus:ring-2 focus:ring-myBlue"
                />
            </div>
            <button onClick={handlSearchClick} className="text-xl hover:text-2xl w-10 transition-all duration-300">
                <IoIosSearch />
            </button>
        </div>
    );
};

export default LiveSearch;
