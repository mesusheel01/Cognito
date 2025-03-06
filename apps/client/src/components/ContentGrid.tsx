

interface Content {
  title: string;
  type: string;
  description?: string;
  link: string;
}
export const ContentGrid = ({ content }: { content?: Content }) => {
    if (!content) return null; // Prevent rendering if content is undefined

    return (
      <div className="flex flex-col hover:bg-gray-100 cursor-pointer rounded-xl p-3 transition-all duration-300">
        {/* Thumbnail or Video */}
        <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mb-3">
          {content.type.toLowerCase() === "youtube" ? (
            <iframe
              src={content.link.replace("watch?v=", "embed/")}
              title={content.title}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={content.link}
              alt={content.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {content.type}
          </div>
        </div>

        {/* Content Info */}
        <div className="flex gap-3">
          <div className="flex-grow">
            <h3 className="font-medium text-base mb-1 line-clamp-2 text-gray-900">
              {content.title}
            </h3>
            {content.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {content.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
