interface Content {
    title: string;
    type: string;
    description?: string;
    link: string;
  }

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  export const ContentGrid = ({ content }: { content?: Content }) => {
    if (!content) return null;

    const isYouTube = content.type.toLowerCase() === 'video' || content.link.includes('youtube')
    const videoId = isYouTube ? extractYouTubeId(content.link) : null;
    const thumbnail = videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : content.link;

    return (
        <div className="flex flex-col gap-2 bg-myBg p-4 text-center cursor-pointer rounded-xl hover:scale-105 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mb-2 shadow-md">
          <img
            src={thumbnail}
            alt={content.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {isYouTube && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-75 rounded-full p-2">
                <svg onClick={()=>window.open(content.link, "_blank")}
                  className="w-8 h-8 text-red-600 hover:p-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 16.5l6-4.5-6-4.5v9z" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-0.5 rounded">
            {content.type}
          </div>
        </div>

        {/* Info */}
        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">{content.title}</h3>
        {content.description && (
          <p className="text-xs text-gray-600 line-clamp-2">{content.description}</p>
        )}
      </div>
    );
  };
