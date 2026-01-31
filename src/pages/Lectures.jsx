import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lectures } from '../constants/lectures';
import {
  PlayCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/SEO';

const Lectures = () => {
  const { playlistId, videoId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedPlaylists, setExpandedPlaylists] = useState({});

  // Initialize expanded state based on URL
  useEffect(() => {
    if (playlistId) {
      setExpandedPlaylists(prev => ({
        ...prev,
        [playlistId]: true,
      }));
    }
  }, [playlistId]);

  // Find current playlist and video data
  const currentPlaylist = lectures.find(p => p.playlistId === playlistId);
  const currentVideo = currentPlaylist?.videos.find(v => v.id === videoId);

  const togglePlaylist = id => {
    setExpandedPlaylists(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVideoSelect = (pId, vId) => {
    navigate(`/lectures/${pId}/${vId}`);
    // On mobile/small screens, close sidebar after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handlePlaylistClick = (e, pId) => {
    // Prevent toggling if clicking the header itself navigates (optional choice, here we toggle)
    e.stopPropagation();
    togglePlaylist(pId);
    // If we want clicking the header to also navigate to the playlist view:
    navigate(`/lectures/${pId}`);
  };

  return (
    <>
      <SEO
        title={
          currentVideo
            ? currentVideo.title
            : currentPlaylist
              ? currentPlaylist.playlistTitle
              : 'Lectures'
        }
        description={
          currentPlaylist
            ? `Watch ${currentPlaylist.playlistTitle} lectures.`
            : 'Browse our video lectures.'
        }
      />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-gray-50 overflow-hidden relative">
        {/* Mobile Header - Visible only on small screens */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-3 flex items-center shadow-sm z-20 shrink-0">
          <button
            className="p-2 -ml-2 text-gray-700 hover:text-primary-600 rounded-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <span className="font-semibold ml-2 text-gray-800 flex items-center">
            <VideoCameraIcon className="h-5 w-5 mr-2 text-primary-600" />
            Lectures
          </span>
        </div>

        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-100 flex flex-col
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <VideoCameraIcon className="h-6 w-6 mr-2 text-primary-600" />
              Lectures
            </h2>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {lectures.map(playlist => (
              <div
                key={playlist.playlistId}
                className="rounded-lg overflow-hidden border border-gray-100 bg-white"
              >
                <button
                  onClick={e => handlePlaylistClick(e, playlist.playlistId)}
                  className={`w-full flex items-center justify-between p-3 text-left transition-colors duration-200
                    ${
                      playlistId === playlist.playlistId
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  <span className="font-semibold text-sm line-clamp-2 md:text-base">
                    {playlist.playlistTitle}
                  </span>
                  {expandedPlaylists[playlist.playlistId] ? (
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 flex-shrink-0 ml-2" />
                  )}
                </button>

                {/* Videos List */}
                {expandedPlaylists[playlist.playlistId] && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {playlist.videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() =>
                          handleVideoSelect(playlist.playlistId, video.id)
                        }
                        className={`w-full flex items-start p-3 text-left transition-colors duration-150 border-b border-gray-100 last:border-0
                          ${
                            videoId === video.id
                              ? 'bg-primary-100 text-primary-800 border-l-4 border-l-primary-600'
                              : 'hover:bg-gray-100 text-gray-600 border-l-4 border-l-transparent'
                          }
                        `}
                      >
                        <span className="text-xs mr-2 mt-0.5 text-gray-400 font-mono">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium line-clamp-2">
                            {video.title}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1 flex items-center">
                            <PlayCircleIcon className="h-3 w-3 mr-1" />
                            {video.duration}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 w-full">
          <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
            {!playlistId ? (
              // Root View: Show all playlists as cards
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Video Lecture Library
                  </h1>
                  <p className="text-gray-600">
                    Select a playlist to start learning
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lectures.map(playlist => (
                    <div
                      key={playlist.playlistId}
                      onClick={() => {
                        togglePlaylist(playlist.playlistId);
                        navigate(`/lectures/${playlist.playlistId}`);
                      }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100 group"
                    >
                      <div className="relative aspect-video bg-gray-200">
                        {playlist.videos[0] && (
                          <img
                            src={playlist.videos[0].thumbnail}
                            alt={playlist.playlistTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <PlayCircleIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {playlist.videos.length} Videos
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                          {playlist.playlistTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Total Duration:{' '}
                          {calculateTotalDuration(playlist.videos)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !videoId ? (
              // Playlist View: Show selected playlist details and list
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {currentPlaylist?.playlistTitle}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {currentPlaylist?.videos.length} lectures
                  </p>
                  <button
                    className="btn-primary flex items-center"
                    onClick={() => {
                      if (currentPlaylist?.videos.length > 0) {
                        handleVideoSelect(
                          currentPlaylist.playlistId,
                          currentPlaylist.videos[0].id
                        );
                      }
                    }}
                  >
                    <PlayCircleIcon className="h-5 w-5 mr-2" />
                    Start Watching
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {currentPlaylist?.videos.map((video, idx) => (
                    <div
                      key={video.id}
                      onClick={() =>
                        handleVideoSelect(currentPlaylist.playlistId, video.id)
                      }
                      className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <span className="text-gray-400 font-mono text-lg w-8 pt-1">
                        {idx + 1}
                      </span>
                      <div className="relative w-32 md:w-40 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-[10px] px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-none">
                          Study this lecture to understand core concepts.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Video Player View
              <div className="space-y-6">
                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={currentVideo?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {currentVideo?.title}
                  </h1>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <PlayCircleIcon className="h-4 w-4 mr-1" />
                    <span>Duration: {currentVideo?.duration}</span>
                  </div>
                  <div className="prose max-w-none text-gray-600 text-sm">
                    <p>
                      Currently watching lecture form playlist{' '}
                      <strong>{currentPlaylist?.playlistTitle}</strong>. Select
                      other videos from the sidebar to continue learning.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

// Helper: extremely rough duration parser "MM:SS" or "HH:MM:SS" -> readable string
// In a real app, use dates/moments.
function calculateTotalDuration(videos) {
  let totalSeconds = 0;
  videos.forEach(v => {
    const parts = v.duration.split(':').map(Number);
    if (parts.length === 2) {
      totalSeconds += parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) return `${hours} hrs ${minutes} mins`;
  return `${minutes} mins`;
}

export default Lectures;
