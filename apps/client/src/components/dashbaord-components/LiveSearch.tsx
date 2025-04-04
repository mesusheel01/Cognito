import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { contentAtom } from "../../store/atoms/contentStore";
import { WiStars } from "react-icons/wi";

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
    const handleAiClick = async(content:contentType)=>{

    }

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
                        className="w-full hidden sm:block px-4 py-1.5 outline-none focus:ring-2 focus:ring-myBlue"
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
                <div className="fixed left-1/2 transform -translate-x-1/2 w-[800px] mt-1 bg-gray-200 rounded-xl shadow-xl border border-gray-200 max-h-[400px] p-2 overflow-y-auto z-[9999]">
                    {filteredResults.map((result, index) => (
                    <div className="flex flex-col px-3 gap-3 bg-white rounded-xl mb-2">
                            <div
                                key={index}
                                onClick={() => handleResultClick(result.link)}
                                className="p-3 hover:bg-gray-100 w-full rounded-xl cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
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

                        {/* New AI Prompt Input Section */}
                        <div className="p-3 border-t border-gray-200">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Enter your prompt (e.g., 'Summarize this content' or 'Explain key points')"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-myBlue focus:ring-1 focus:ring-myBlue transition-all duration-300 outline-none text-sm"
                                    />
                                </div>
                                <button className="flex items-center gap-2 bg-gradient-to-r from-myBlue to-blue-500 hover:from-blue-500 hover:to-myBlue text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                                    <svg
                                        className="w-4 h-4 animate-pulse"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <span>Generate</span>
                                </button>
                            </div>
                            {/* Optional: Add a suggestions row */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <span className="text-xs text-gray-500">Quick prompts:</span>
                                <button className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                    Summarize
                                </button>
                                <button className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                    Key points
                                </button>
                                <button className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                    Explain
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {showResults && searchQuery && filteredResults.length === 0 && (
                <div className="fixed left-1/2 transform -translate-x-1/2 lg:w-[800px] sm:w-[300px] md:w-[600px] mt-1 bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-[9999]">
                    No results found
                </div>
            )}
        </div>
    );
};

export default LiveSearch;
