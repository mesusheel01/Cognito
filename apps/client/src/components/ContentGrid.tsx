interface Content {
    title: string;
    type: string;
    description?: string;
    image?: string;
    link?: string;
    tags?: string[];
  }

  const extractYouTubeId = (url: string): string | null => {
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
          {content.description && (
            <p className="text-xs text-gray-600 line-clamp-2">{content.description}</p>
          )}
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

    if (content.type === 'docs') {
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
          {content.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{content.description}</p>
          )}
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

    if (content.type === 'links') {
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
        {content.description && (
          <p className="text-sm text-gray-600 mb-2">{content.description}</p>
        )}
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

  export const ContentGrid: React.FC<{ contents: Content[] }> = ({ contents }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 relative z-0">
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </div>
    );
  };
