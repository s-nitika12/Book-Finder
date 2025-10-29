import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState("title"); // title, author, subject
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [resultsLimit, setResultsLimit] = useState(12);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookSearchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Save search to history
  const saveToHistory = (searchQuery, searchTypeValue) => {
    const newHistory = [
      { query: searchQuery, type: searchTypeValue, timestamp: Date.now() },
      ...searchHistory.filter(h => !(h.query === searchQuery && h.type === searchTypeValue))
    ].slice(0, 5); // Keep last 5 searches
    setSearchHistory(newHistory);
    localStorage.setItem('bookSearchHistory', JSON.stringify(newHistory));
  };

  const searchBooks = async (searchQuery = query, type = searchType) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    setLoading(true);
    setBooks([]);

    try {
      let url;
      switch (type) {
        case "author":
          url = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchQuery)}`;
          break;
        case "subject":
          url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(searchQuery)}`;
          break;
        default:
          url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, resultsLimit));
        saveToHistory(searchQuery, type);
      } else {
        setError("No books found. Try a different search term or type.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem.query);
    setSearchType(historyItem.type);
    searchBooks(historyItem.query, historyItem.type);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('bookSearchHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-indigo-900">
            📚 Book Finder
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Discover your next great read from millions of books
          </p>
        </header>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={`Search by ${searchType}...`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchBooks()}
              />
              <button
                onClick={() => searchBooks()}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition font-semibold"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Search Type Selector */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 self-center">Search by:</span>
            {["title", "author", "subject"].map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  searchType === type
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-medium">Recent Searches:</span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHistoryClick(item)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition"
                  >
                    {item.query} ({item.type})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Searching for books...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && books.length > 0 && (
          <div className="mb-4 text-gray-600 text-sm">
            Found {books.length} books
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.map((book, index) => (
            <div
              key={`${book.key}-${index}`}
              onClick={() => setSelectedBook(book)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-full h-56 mb-3 flex items-center justify-center bg-gray-100 rounded">
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/150x200?text=No+Cover"
                  }
                  alt={book.title}
                  className="max-h-full max-w-full object-contain rounded"
                  loading="lazy"
                />
              </div>
              <h2 className="font-semibold text-base text-center line-clamp-2 mb-2 text-gray-800">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 text-center line-clamp-1 mb-1">
                {book.author_name ? book.author_name.slice(0, 2).join(", ") : "Unknown Author"}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {book.first_publish_year || "Year N/A"}
              </p>
              {book.ratings_average && (
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{book.ratings_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBook(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedBook.title}</h2>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={
                      selectedBook.cover_i
                        ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
                        : "https://via.placeholder.com/200x300?text=No+Cover"
                    }
                    alt={selectedBook.title}
                    className="w-48 rounded shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-700">Author(s)</h3>
                      <p className="text-gray-600">
                        {selectedBook.author_name?.join(", ") || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">First Published</h3>
                      <p className="text-gray-600">{selectedBook.first_publish_year || "N/A"}</p>
                    </div>
                    {selectedBook.publisher && (
                      <div>
                        <h3 className="font-semibold text-gray-700">Publisher(s)</h3>
                        <p className="text-gray-600">
                          {selectedBook.publisher.slice(0, 3).join(", ")}
                        </p>
                      </div>
                    )}
                    {selectedBook.isbn && (
                      <div>
                        <h3 className="font-semibold text-gray-700">ISBN</h3>
                        <p className="text-gray-600 text-sm">{selectedBook.isbn[0]}</p>
                      </div>
                    )}
                    {selectedBook.subject && (
                      <div>
                        <h3 className="font-semibold text-gray-700">Subjects</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedBook.subject.slice(0, 8).map((subject, idx) => (
                            <span
                              key={idx}
                              className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedBook.ratings_average && (
                      <div>
                        <h3 className="font-semibold text-gray-700">Rating</h3>
                        <p className="text-gray-600">
                          ⭐ {selectedBook.ratings_average.toFixed(2)} ({selectedBook.ratings_count} ratings)
                        </p>
                      </div>
                    )}
                    <a
                      href={`https://openlibrary.org${selectedBook.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      View on Open Library
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
