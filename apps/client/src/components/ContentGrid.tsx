import { useState } from "react";
import { WiStars } from "react-icons/wi";
import { useRecoilState } from "recoil";
import { aiPrompt, aiResLoading, aiResponse } from "../store/atoms/aiPromptAction";
import axios from "axios";


interface Content {
    title: string;
    type: string;
    image?: string;
    link?: string;
    tags?: string[];
  }

  const extractYouTubeId = (url: any): string | null => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const ContentCard = ({ content }: { content: Content }) => {

    // Different card designs based on content type
    if (content.type.toLowerCase() === 'video' || (content.link && content.link.includes('youtube'))) {
      const videoId = extractYouTubeId(content.link);
      const thumbnail = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : content.image;

      return (
        <div
          onClick={() => window.open(content.link, "_blank")}
          className="flex flex-col m-8 bg-myBg p-4 text-center cursor-pointer rounded-xl hover:scale-105 transition-all duration-300"
        >
          <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mb-2 shadow-md">
            <img
              src={thumbnail}
              alt={content.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-75 rounded-full p-2">
                <svg
                  className="w-8 h-8 text-red-600 hover:p-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 16.5l6-4.5-6-4.5v9   " />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-0.5 rounded">
              {content.type}
            </div>
          </div>
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">{content.title}</h3>
        </div>
      );
    }

    if (content.type === 'twitter') {
      return (
        <div
          onClick={() => window.open(content.link, "_blank")}
          className="flex flex-col bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-xl p-4 transition-all duration-300 border border-blue-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="font-medium text-blue-500">Twitter Post</span>
          </div>
          <h3 className="font-medium text-base mb-2">{content.title}</h3>
          {content.link && (
            <a href={content.link} className="text-blue-600 hover:underline text-sm mb-2 break-all">
              {content.link}
            </a>
          )}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (content.type === 'doc') {
      return (
        <div
          onClick={() => window.open(content.link, "_blank")}
          className="flex flex-col bg-myBlue hover:bg-gray-100 cursor-pointer rounded-xl p-4 transition-all duration-300 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-medium text-base">{content.title}</h3>
          </div>
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (content.type === 'link') {
      return (
        <div
          onClick={() => window.open(content.link, "_blank")}
          className="flex flex-col bg-green-50 hover:bg-green-100 cursor-pointer rounded-xl p-4 transition-all duration-300 border border-green-200"
        >
          <h3 className="font-medium text-base mb-2">{content.title}</h3>
          {content.link && (
            <a href={content.link} className="text-green-600 hover:underline text-sm mb-2 break-all">
              {content.link}
            </a>
          )}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Default card design for other types
    return (
      <div
        onClick={() => window.open(content.link, "_blank")}
        className="flex flex-col bg- hover:bg-myBlue cursor-pointer rounded-xl p-4 transition-all duration-300 border border-gray-200"
      >
        <h3 className="font-medium text-base mb-2">{content.title}</h3>
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {content.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // First, create a helper function to parse numbered points
  const parseNumberedPoints = (text: string): string[] => {
    // Split by newlines and filter for numbered points
    const lines = text.split('\n');
    const points: string[] = [];
    let currentPoint = '';

    lines.forEach((line) => {
      // Match lines starting with numbers (1., 2., etc.) or bullet points
      const numberMatch = line.match(/^\s*(\d+\.|\•|\-)\s*(.+)/);
      if (numberMatch) {
        if (currentPoint) points.push(currentPoint.trim());
        currentPoint = numberMatch[2];
      } else if (currentPoint && line.trim()) {
        // Append to current point if it's a continuation
        currentPoint += ' ' + line.trim();
      } else if (line.trim() && !currentPoint) {
        // If it's not a numbered point but has content
        points.push(line.trim());
      }
    });

    // Add the last point if exists
    if (currentPoint) points.push(currentPoint.trim());
    return points.length ? points : [text];
  };

  // Add this component for displaying individual points
  const AiResponsePoint: React.FC<{ point: string; index: number }> = ({ point, index }) => (
  <div className="flex  items-start space-x-4 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-3">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-gradient-to-r from-myBlue to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
        {index + 1}
      </div>
    </div>
    <div className="flex-1">
      <p className="text-gray-700 leading-relaxed">{point}</p>
    </div>
  </div>
);

  export const ContentGrid: React.FC<{ contents: Content[] }> = ({ contents }) => {
    const [clickedContentId, setClickedContentId] = useState<number | null>(null);
    const [prompt, setPrompt] = useRecoilState(aiPrompt)
    const [aiResultLoading, setAiResultLoading] = useRecoilState(aiResLoading)
    const [aiResult, setAiResult] = useRecoilState(aiResponse)
    const handleAiButtonClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the card's onClick from triggering
        setClickedContentId(clickedContentId === index ? null : index);
        setAiResult("")
    };

    const handleAiSearch = async(title:string)=>{

        try {
            setAiResultLoading(true)
            const token = localStorage.getItem('token')
            const res = await axios.post('https://cognito-05vd.onrender.com/api/v1/ai-result',{
                title,
                prompt
            },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            if(res.data.message){
                const messages = parseNumberedPoints(res.data.message)
                setAiResult(messages.join('\n'))
                console.log(res.data.message)
            }
        } catch (error) {
            console.log('error')
        }finally{
            setPrompt("")
            setAiResultLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 relative z-0">
            {contents.map((content, index) => (
                <div key={index} className="relative group">
                    <ContentCard content={content} />
                    {/* AI Button */}
                    <button
                        onClick={(e) => handleAiButtonClick(index, e)}
                        className="absolute bottom-4 right-2 p-2 bg-myGreen text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:rotate-180"
                    >
                        <WiStars className="text-xl" />
                    </button>
                    {/* Prompt Input Section - Only show for clicked content */}
                    {clickedContentId === index && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50">
                            <div className="p-3 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={prompt}
                                            onChange={(e)=>setPrompt(e.target.value)}
                                            placeholder="Enter your prompt (e.g., 'Summarize this content' or 'Explain key points')"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-myBlue focus:ring-1 focus:ring-myBlue transition-all duration-300 outline-none text-sm"
                                        />
                                    </div>
                                    <button
                                    onClick={()=>handleAiSearch(content?.title)}
                                    className="flex items-center gap-2 relative overflow-hidden px-4 py-2 rounded-lg group"
                                    >
                                        {/* Background with transition */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-myBlue to-blue-500 group-hover:from-blue-500 group-hover:to-myBlue transition-all duration-300"></div>

                                        {/* Content */}
                                        <div className="relative flex items-center gap-2 text-white">
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
                                        </div>
                                    </button>
                                </div>
                                {/* Quick prompts */}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="text-xs text-gray-500">Quick prompts:</span>
                                    <button onClick={()=>setPrompt('Summarize')} className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                        Summarize
                                    </button>
                                    <button onClick={()=>setPrompt('Key points')} className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                        Key points
                                    </button>
                                    <button onClick={()=>setPrompt('Explain')} className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-myBlue hover:text-white transition-all duration-300">
                                        Explain
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* AI Response or Loading Indicator */}
                    {clickedContentId === index && (
                        <div className="mt-4 bg-gray-50 rounded-xl shadow-lg overflow-hidden">
                            {aiResultLoading ? (
                                <div className="flex items-center justify-center p-6">
                                    <div className="flex flex-col items-center space-y-2">
                                        <svg className="animate-spin h-8 w-8 text-myBlue" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        <span className="text-gray-500">Processing your request...</span>
                                    </div>
                                </div>
                            ) : aiResult ? (
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis</h3>
                                        <div className="h-1 w-20 bg-gradient-to-r from-myBlue to-blue-500 rounded-full"></div>
                                    </div>

                                    <div className="space-y-2">
                                        {parseNumberedPoints(aiResult).map((point, pointIndex) => (
                                            <AiResponsePoint
                                                key={pointIndex}
                                                point={point}
                                                index={pointIndex}
                                            />
                                        ))}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => {navigator.clipboard.writeText(aiResult)}}
                                            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => setAiResult('')}
                                            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    No AI response available. Try generating one!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
  };
