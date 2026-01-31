import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { SITE_INFO } from '../constants/siteData';
import LazyImage from './LazyImage';

const CourseCard = ({ course }) => {
  const handleCall = () => {
    window.open(`tel:${SITE_INFO.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${course.name} course. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="p-6">
        {/* Course Logo and Header */}
        <div className="flex items-center space-x-4 mb-4">
          <LazyImage
            src={
              course.logo.startsWith('http')
                ? course.logo
                : `${import.meta.env.BASE_URL}${course.logo.startsWith('/') ? course.logo.slice(1) : course.logo}`
            }
            alt={course.name}
            className="w-16 h-16 rounded-lg object-cover"
            placeholder="📚"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {course.category.map((cat, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            What you'll learn:
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Course Details */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">{course.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {course.monthlyFee ? 'Monthly Fee' : 'Total Fee'}
            </p>
            <p className="font-bold text-2xl text-primary-600">
              {course.monthlyFee || course.fee}
            </p>
            {course.monthlyFee && (
              <p className="text-xs text-gray-500">Total: {course.fee}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            <PhoneIcon className="h-5 w-5" />
            <span>Call Now</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/courses/${course.slug}`}
          className="mt-4 flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold py-2 transition-colors duration-200 border-t border-gray-100"
        >
          <span>View Detailed Course Info</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
