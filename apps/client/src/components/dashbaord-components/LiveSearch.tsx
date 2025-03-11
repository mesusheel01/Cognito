import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { contentAtom } from "../../store/atoms/contentStore";

interface Content {
  title: string;
  type: string;
  link: string;
  tags?: string[];
}

const LiveSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState<Content[]>([]);
    const [showResults, setShowResults] = useState(false);

    const contents = useRecoilValue(contentAtom);

    useEffect(() => {
        // Filter contents based on search query
        if (searchQuery.trim()) {
            const results = contents.filter(content =>
                content.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(results);
            setShowResults(true);
        } else {
            setFilteredResults([]);
            setShowResults(false);
        }

        const handleSearchShortcut = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                handleSearchClick();
            }
        };

        // Close results when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };

        window.addEventListener("keydown", handleSearchShortcut);
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("keydown", handleSearchShortcut);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [searchQuery, contents]);

    const handleSearchClick = () => {
        inputRef.current?.focus();
        setShowResults(true);
    };

    const handleResultClick = (link: string) => {
        window.open(link, "_blank");
        setShowResults(false);
        setSearchQuery("");
    };

    return (
        <div className="relative max-w-xl mx-auto">
            <div className="flex gap-2 p-4">
                <div className="relative flex-1 border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-myBlue transition-all">
                    <input
                        type="text"
                        value={searchQuery}
                        ref={inputRef}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter to get the depth of the context!"
                        className="w-full px-4 py-1.5 outline-none focus:ring-2 focus:ring-myBlue"
                    />
                </div>
                <button
                    onClick={handleSearchClick}
                    className="text-xl hover:text-2xl w-10 transition-all duration-300"
                >
                    <IoIosSearch />
                </button>
            </div>

            {/* Search Results Dropdown */}
            {showResults && filteredResults.length > 0 && (
                <div className="fixed left-1/2 transform -translate-x-1/2 w-full max-w-xl mt-1 bg-myGreen opacity-90 rounded-xl shadow-xl border border-gray-200 max-h-[400px] overflow-y-auto z-[9999]">
                    {filteredResults.map((result, index) => (
                        <div
                            key={index}
                            onClick={() => handleResultClick(result.link)}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        >
                            <div className="flex items-center gap-2">
                                {/* Icon based on content type */}
                                <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                                    {result.type}
                                </span>
                                <h4 className="font-medium">{result.title}</h4>
                            </div>
                            {result.tags && result.tags.length > 0 && (
                                <div className="mt-1 flex gap-1 flex-wrap">
                                    {result.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs text-gray-600"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {showResults && searchQuery && filteredResults.length === 0 && (
                <div className="fixed left-1/2 transform -translate-x-1/2 w-full max-w-xl mt-1 bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-[9999]">
                    No results found
                </div>
            )}
        </div>
    );
};

export default LiveSearch;
