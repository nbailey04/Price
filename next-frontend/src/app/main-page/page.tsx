'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  description: string;
  price: string;
};

export default function MainPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsReady(true);
    }
  }, [router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError('An error occurred while fetching results.');
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">
      {/* Intro Box */}
      <div className="w-full max-w-3xl bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md text-center mb-12">
        <h2 className="text-2xl font-bold text-orange-400 mb-2">Welcome to Price Compare</h2>
        <p className="text-gray-300 text-lg">
          This app helps you quickly compare grocery prices across multiple retailers so you can save time and money.
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Price Compare</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your search term"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto"></div>
            <p className="text-sm mt-2 text-gray-400">Loading results...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-400 mt-4">{error}</p>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 bg-gray-800 p-4 rounded border border-gray-600 w-full text-left max-w-xl">
            <h2 className="text-lg font-bold text-orange-400 mb-3">Results:</h2>
            <ul className="space-y-2">
              {results.map((item, index) => (
                <li key={index} className="text-white">
                  <span className="font-semibold">{item.description}</span> —{' '}
                  <span className="text-orange-300">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* About Section */}
      <section className="w-full max-w-3xl bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md mt-12">
        <h3 className="text-xl font-semibold text-white mb-3">About This App</h3>
        <p className="text-gray-400 leading-relaxed">
          Price Compare is designed to streamline your grocery shopping experience. Whether you're trying to find the best deal
          on your favorite snacks or comparing prices for bulk items, this tool helps you shop smarter by providing real-time
          results from multiple sources.
        </p>
      </section>
    </div>
  );
}
