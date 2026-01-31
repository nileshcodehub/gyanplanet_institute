import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPinIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { SITE_INFO } from '../constants/siteData';
const LazyMap = lazy(() => import('../components/LazyMap'));

const AboutUs = () => {
  const branches = [
    {
      id: 1,
      name: 'Gurugram (Head Office)',
      address: SITE_INFO.address,
      phone: SITE_INFO.phone,
      mapLink: SITE_INFO.mapUrl,
    },
    {
      id: 2,
      name: 'GYANPLANET INSTITUTE - Sector 10A',
      address:
        'gali no 3, Khandsa Rd, near vishal mega mart, Shakti Park Colony, Sector 10A, Gurugram, Haryana 122001',
      phone: '+91-1244600290',
      mapLink:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1786.6919569064635!2d77.01090088718003!3d28.445014265280566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1967b9f47801%3A0x35da0a1c4adf96d2!2sGYANPLANET%20INSTITUTE%20-%20Sector%2010A!5e0!3m2!1sen!2sin!4v1769902037734!5m2!1sen!2sin', // Placeholder map link
    },
  ];

  const teachers = [
    {
      id: 1,
      name: 'Mr. Nilesh Kumar',
      role: 'Founder & Senior Instructor',
      expertise: 'Web Development, Programming (C++, Java, Python)',
      experience: '10+ Years',
      image: '/assets/images/teachers/teacher1.webp', // Placeholder path
    },
    {
      id: 2,
      name: 'Ms. Anjali Singh',
      role: 'Senior Faculty - Commerce',
      expertise: 'Tally Prime, GST, Taxation, Financial Accounting',
      experience: '8+ Years',
      image: '/assets/images/teachers/teacher2.webp',
    },
    {
      id: 3,
      name: 'Mr. Rohit Sharma',
      role: 'CAD & Design Expert',
      expertise: 'AutoCAD 2D/3D, CorelDraw, Photoshop',
      experience: '6+ Years',
      image: '/assets/images/teachers/teacher3.webp',
    },
    {
      id: 4,
      name: 'Ms. Priya Gupta',
      role: 'Office & Management Trainer',
      expertise: 'Advanced Excel, MIS Reporting, Soft Skills',
      experience: '7+ Years',
      image: '/assets/images/teachers/teacher4.webp',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - {SITE_INFO.name}</title>
        <meta
          name="description"
          content={`Learn more about ${SITE_INFO.name}, our branches, and our experienced faculty members committed to your success.`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            About {SITE_INFO.name}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            {SITE_INFO.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Institute Description */}
        <section>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex items-center mb-6">
                <BuildingOffice2Icon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {SITE_INFO.description}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Gyanplanet Institute, we are dedicated to bridging the gap
                between academic learning and industry requirements. Our
                curriculum is designed by industry experts to ensure that
                students gain practical, hands-on experience in their chosen
                fields. Whether it is mastering the complexities of Accounting
                with Tally Prime, diving into the logic of Programming, or
                unleashing creativity through Graphic Design, we provide the
                perfect environment for growth and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Branches */}
        <section>
          <div className="flex items-center mb-8">
            <MapPinIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Branches</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {branches.map(branch => (
              <div
                key={branch.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
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
                    <LazyMap mapUrl={branch.mapLink} />
                  </Suspense>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {branch.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 items-start flex mb-4">
                    <MapPinIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    {branch.address}
                  </p>
                  <p className="text-gray-600 items-center flex mb-6">
                    <BuildingOffice2Icon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    {branch.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experienced Teachers */}
        <section>
          <div className="flex items-center mb-8">
            <AcademicCapIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              Our Experienced Faculty
            </h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Our team consists of highly qualified professionals with years of
            industry and teaching experience.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map(teacher => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
              >
                {/* 
                  Using a gradient placeholder for teacher image if real images are not available. 
                  In a real scenario, you would use an <img> tag with teacher.image
                */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <UserGroupIcon className="h-20 w-20 text-white opacity-75" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">
                    {teacher.role}
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Expertise:
                      </span>{' '}
                      {teacher.expertise}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Experience:
                      </span>{' '}
                      {teacher.experience}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
