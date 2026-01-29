import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  UsersIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import { SITE_INFO, HERO_CONTENT, SITE_STATS } from '../constants/siteData';
import { COURSES } from '../constants/coursesData';

// Lazy load the map component
const LazyMap = lazy(() => import('../components/LazyMap'));

const Home = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Memoize featured courses to prevent recalculation
  const featuredCourses = useMemo(() => COURSES.slice(0, 3), []);

  // Preload hero background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroImageLoaded(true);
    img.src =
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75';
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Transform your future with quality education at Gyanplanet Institute. Explore our comprehensive courses and expert guidance."
        keywords="education, courses, learning, institute, training, certification"
      />

      {/* Hero Section */}
      <section
        className={`${heroImageLoaded ? 'hero-bg' : 'hero-bg-preload'} min-h-screen flex items-center transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 px-4">
              {HERO_CONTENT.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/courses"
                className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto"
              >
                {HERO_CONTENT.ctaText}
              </Link>
              <Link
                to="/books"
                className="glass-effect hover:bg-white hover:bg-opacity-20 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-200 w-full sm:w-auto"
              >
                {HERO_CONTENT.secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 bg-${SITE_STATS.studentsEnrolled.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {SITE_STATS.studentsEnrolled.count}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {SITE_STATS.studentsEnrolled.label}
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-16 h-16 bg-${SITE_STATS.coursesAvailable.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <BookOpenIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {SITE_STATS.coursesAvailable.count}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {SITE_STATS.coursesAvailable.label}
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div
                className={`w-16 h-16 bg-${SITE_STATS.successRate.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {SITE_STATS.successRate.count}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {SITE_STATS.successRate.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Featured Courses
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover our most popular courses designed to help you achieve
              your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredCourses.map((course, index) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <LazyImage
                  src={`${course.logo}&w=400&h=300&fit=crop`}
                  alt={course.name}
                  className="w-full h-40 sm:h-48 object-cover"
                  placeholder="📚"
                  priority={index === 0}
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-primary-600">
                      {course.monthlyFee || course.fee}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="btn-primary inline-block w-full sm:w-auto"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why Choose {SITE_INFO.name}?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                We are committed to providing high-quality education that
                empowers students to achieve their dreams. Our experienced
                instructors, comprehensive curriculum, and hands-on approach
                ensure you get the skills needed for success.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Expert instructors with industry experience
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Hands-on projects and real-world applications
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Job placement assistance and career guidance
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Flexible learning schedules
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <LazyImage
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75"
                alt="Students learning"
                className="rounded-xl shadow-lg w-full"
                placeholder="👥"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Visit Our Campus
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Come and experience our learning environment firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                    Address
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {SITE_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                    Phone
                  </h3>
                  <a
                    href={`tel:${SITE_INFO.phone}`}
                    className="text-primary-600 hover:text-primary-700 text-sm sm:text-base"
                  >
                    {SITE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                    Email
                  </h3>
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="text-primary-600 hover:text-primary-700 text-sm sm:text-base break-all"
                  >
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <Link
                  to="/contact"
                  className="btn-primary inline-block w-full sm:w-auto text-center"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
              <Suspense
                fallback={
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-500 text-sm sm:text-base">
                      Loading map...
                    </span>
                  </div>
                }
              >
                <LazyMap mapUrl={SITE_INFO.mapUrl} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
