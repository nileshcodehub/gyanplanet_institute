import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import LazyImage from './LazyImage';

const BookCard = ({ book }) => {
  const handleDownload = () => {
    window.open(book.downloadUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover flex flex-col md:flex-row h-full">
      {/* Book Image */}
      <div className="relative md:w-2/5 aspect-[3/4] md:aspect-auto overflow-hidden bg-gray-100 flex-shrink-0">
        <LazyImage
          src={
            book.image.startsWith('http')
              ? book.image
              : `${import.meta.env.BASE_URL}${book.image.startsWith('/') ? book.image.slice(1) : book.image}`
          }
          alt={book.title}
          className="w-full h-full object-contain"
          placeholder="📖"
        />
        {book.originalPrice && (
          <div className="absolute bottom-5 left-3 bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
            SAVE ₹
            {parseInt(book.originalPrice.replace('₹', '')) -
              parseInt(book.price.replace('₹', ''))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex-1">
          {/* Title and Author */}
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 mb-3 font-medium">
            by {book.author}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 md:line-clamp-4 leading-relaxed">
            {book.description}
          </p>

          {/* Book Details */}
          <div className="flex justify-between items-center mb-4 text-xs font-semibold text-gray-500">
            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-primary-600">
                {book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {book.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center">PDF Format</div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span className="text-sm">Download PDF</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
