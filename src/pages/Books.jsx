import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import BookCard from '../components/BookCard';
import { BOOKS } from '../constants/siteData';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  // Get dynamic categories based on search
  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        BOOKS.filter(book => {
          if (!searchTerm) return true;
          const searchLow = searchTerm.toLowerCase();
          return (
            book.title.toLowerCase().includes(searchLow) ||
            book.description.toLowerCase().includes(searchLow) ||
            book.author.toLowerCase().includes(searchLow) ||
            book.searchKeys?.some(key => key.toLowerCase().includes(searchLow))
          );
        })
          .flatMap(book => book.category)
          .map(cat => cat.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)));
  }, [searchTerm]);

  // Filter and sort books
  const filteredAndSortedBooks = BOOKS.filter(book => {
    const searchLow = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(searchLow) ||
      book.description.toLowerCase().includes(searchLow) ||
      book.author.toLowerCase().includes(searchLow) ||
      book.category.some(cat => cat.toLowerCase().includes(searchLow)) ||
      book.searchKeys?.some(item => item.toLowerCase().includes(searchLow));

    const matchesCategory =
      selectedCategory === 'All' || book.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (
          parseInt(a.price.replace('₹', '')) -
          parseInt(b.price.replace('₹', ''))
        );
      case 'price-high':
        return (
          parseInt(b.price.replace('₹', '')) -
          parseInt(a.price.replace('₹', ''))
        );

      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <>
      <SEO
        title="Books"
        description="Download our comprehensive collection of educational books and resources. Expert-authored content to support your learning journey."
        keywords="books, ebooks, pdf, learning resources, educational materials, download"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-secondary-600 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BookOpenIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-80" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-2">
                Our Books Collection
              </h1>
              <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
                Access our comprehensive library of educational books written by
                industry experts. Download instantly and start learning today.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-6 sm:py-8 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 md:justify-between items-start">
              {/* Search Bar */}
              <div className="relative w-full max-w-md  lg:mx-0">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="title">Sort by Title</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
              Showing {filteredAndSortedBooks.length} of {BOOKS.length} books
            </div>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredAndSortedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredAndSortedBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpenIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-600 mb-4 px-4 text-sm sm:text-base">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSortBy('title');
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Authors Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our Expert Authors
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Learn from industry professionals and experienced educators who
                bring real-world knowledge to every page.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...new Set(BOOKS.map(book => book.author))]
                .slice(0, 4)
                .map(author => {
                  const authorBooks = BOOKS.filter(
                    book => book.author === author
                  );

                  return (
                    <div key={author} className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <span className="text-white font-bold text-lg sm:text-2xl">
                          {author
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        {author}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        {authorBooks.length} Books
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-secondary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Download our books instantly and access expert knowledge anytime,
              anywhere. Perfect for self-paced learning and reference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button className="bg-white text-secondary-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto">
                Browse All Books
              </button>
              <a
                href="mailto:info@gyanplanetinstitute.com?subject=Book Inquiry"
                className="border-2 border-white hover:bg-white hover:text-secondary-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto"
              >
                Contact for Bulk Orders
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Books;
