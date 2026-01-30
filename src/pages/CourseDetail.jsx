import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  WrenchIcon,
  CommandLineIcon,
  GlobeAltIcon,
  DocumentArrowDownIcon,
  LightBulbIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import { COURSES } from '../constants/coursesData';
import { SITE_INFO } from '../constants/siteData';
import LazyImage from '../components/LazyImage';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const course = useMemo(() => COURSES.find(c => c.slug === slug), [slug]);

  const relatedCourses = useMemo(() => {
    if (!course) return [];
    return COURSES.filter(
      c =>
        c.id !== course.id &&
        c.category.some(cat => course.category.includes(cat))
    ).slice(0, 3);
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The course you are looking for might have been moved or renamed.
          </p>
          <Link
            to="/courses"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleCall = () => {
    window.open(`tel:${SITE_INFO.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${course.name} course. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SEO
        title={`${course.name} Course - Syllabus, Career & Fees`}
        description={course.overview || course.description}
        keywords={`${course.name}, course syllabus, career opportunities, ${course.category.join(', ')}`}
      />

      {/* Hero Section */}
      <section className="bg-primary-900 py-6 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary-200 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {course.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {course.name}
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <p className="text-primary-300 text-sm mb-1 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="text-2xl font-bold">{course.duration}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <p className="text-primary-300 text-sm mb-1 uppercase tracking-wider">
                    Course Fee
                  </p>
                  <p className="text-2xl font-bold">
                    {course.monthlyFee || course.fee}
                  </p>
                </div>
                {course.monthlyFee && (
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hidden sm:block">
                    <p className="text-primary-300 text-sm mb-1 uppercase tracking-wider">
                      Full Fee
                    </p>
                    <p className="text-2xl font-bold">{course.fee}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <LazyImage
                  src={
                    course.logo.startsWith('http')
                      ? `${course.logo}&w=600&h=600&fit=crop`
                      : course.logo
                  }
                  alt={course.name}
                  className="w-full aspect-square object-contain bg-white/5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <LightBulbIcon className="h-8 w-8 text-primary-600" />
                <span>Course Overview</span>
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  {course.overview ||
                    'Master the essential skills required for this industry with our expert-led training.'}
                </p>

                {course.benefits && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Key Benefits:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Who Should Enroll */}
            {course.whoShouldEnroll && (
              <section id="audience">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <UserGroupIcon className="h-8 w-8 text-primary-600" />
                  <span>Who Should Enroll?</span>
                </h2>
                <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
                  <p className="text-lg text-primary-900 font-medium leading-relaxed">
                    {course.whoShouldEnroll}
                  </p>
                </div>
              </section>
            )}

            {/* Syllabus */}
            <section id="syllabus">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <AcademicCapIcon className="h-8 w-8 text-primary-600" />
                <span>What You Will Learn (Syllabus)</span>
              </h2>
              <div className="space-y-4">
                {(course.syllabus || []).map((module, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                        {mIdx + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {module.module}
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {module.topics.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            className="flex items-center space-x-2 text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Opportunities */}
            {course.careerOpportunities && (
              <section id="career">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <BriefcaseIcon className="h-8 w-8 text-primary-600" />
                  <span>Career Opportunities</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {course.careerOpportunities.map((job, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <span className="font-bold text-gray-800">{job}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Resources & Installation */}
            <section
              id="resources"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <WrenchIcon className="h-6 w-6 text-primary-600" />
                  <span>Software Resources</span>
                </h3>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                  <div className="space-y-6">
                    {course.resources?.free && (
                      <div>
                        <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2">
                          Free Resources
                        </p>
                        <ul className="space-y-2">
                          {course.resources.free.map((res, i) => (
                            <li
                              key={i}
                              className="text-gray-600 flex items-center space-x-2"
                            >
                              <GlobeAltIcon className="h-4 w-4" />
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {course.installationGuide && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">
                          Installation Guide
                        </p>
                        <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                          {course.installationGuide}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <CommandLineIcon className="h-6 w-6 text-primary-600" />
                  <span>Free Alternatives</span>
                </h3>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                  <div className="space-y-4">
                    {(course.alternatives || []).map((alt, i) => (
                      <a
                        key={i}
                        href={alt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-200"
                      >
                        <span className="font-bold text-gray-900">
                          {alt.name}
                        </span>
                        <GlobeAltIcon className="h-5 w-5 text-primary-400" />
                      </a>
                    ))}
                    {!course.alternatives && (
                      <p className="text-gray-500 italic">
                        No free alternatives listed.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Sticky Action Card */}
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600 transform -translate-y-12 translate-x-12 rotate-45 opacity-10"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Enroll Now
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={handleCall}
                    className="w-full flex items-center justify-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary-200"
                  >
                    <PhoneIcon className="h-6 w-6" />
                    <span>Inquiry via Phone</span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-green-200"
                  >
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    <span>Inquiry via WhatsApp</span>
                  </button>
                </div>
                <p className="mt-8 text-sm text-gray-500 text-center">
                  Classes available <strong>Offline</strong> at our Gurugram
                  center.
                </p>
                <div className="mt-6 flex items-center justify-center space-x-4 border-t border-gray-100 pt-6">
                  <div className="flex -space-x-2"></div>
                  <span className="text-sm font-medium text-gray-600">
                    5k+ Enrolled
                  </span>
                </div>
              </div>

              {/* Related Courses */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <DocumentArrowDownIcon className="h-6 w-6 text-primary-600" />
                  <span>Related Courses</span>
                </h3>
                <div className="space-y-6">
                  {relatedCourses.map(relCourse => (
                    <Link
                      key={relCourse.id}
                      to={`/courses/${relCourse.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-100 group-hover:border-primary-200 transition-colors duration-200">
                          <LazyImage
                            src={
                              relCourse.logo.startsWith('http')
                                ? `${relCourse.logo}&w=100&h=100&fit=crop`
                                : relCourse.logo
                            }
                            alt={relCourse.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-2"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                            {relCourse.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {relCourse.duration}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
