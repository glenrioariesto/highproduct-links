import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LinkCard from './components/LinkCard';

function App() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  // Infinite Scroll state and ref
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef(null);

  // Reset pagination count on search/category change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchVal, activeCategory]);

  // Observer hook for infinite scrolling
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredLinks.length) {
          // Load 10 more items
          setVisibleCount((prev) => Math.min(prev + 10, filteredLinks.length));
        }
      },
      { rootMargin: '150px' } // Load 150px before reaching the bottom for seamless UX
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [filteredLinks, visibleCount]);

  // Fetch links from public/links.json on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}links.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load links data');
        return res.json();
      })
      .then((data) => {
        setLinks(data);
        setFilteredLinks(data);
        
        // Compute categories dynamically from links
        const uniqCats = ['All', ...new Set(data.map((l) => l.category).filter(Boolean))];
        setCategories(uniqCats);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching links:', err);
        setLoading(false);
      });
  }, []);

  // Filter links based on search keyword and selected category tab
  useEffect(() => {
    let result = links;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter((l) => l.category === activeCategory);
    }

    // Filter by search keyword (case-insensitive title or category search)
    if (searchVal.trim() !== '') {
      const query = searchVal.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.category.toLowerCase().includes(query)
      );
    }

    setFilteredLinks(result);
  }, [searchVal, activeCategory, links]);

  return (
    <div className="app-container">
      {/* 1. Profile Header */}
      <Header />

      {/* 2. Interactive Search Bar */}
      <SearchBar searchVal={searchVal} setSearchVal={setSearchVal} />

      {/* 3. Dynamic Categories Filter Tabs */}
      {!loading && categories.length > 1 && (
        <div className="categories-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 4. Link Cards List */}
      <main className="links-list">
        {loading ? (
          <div className="empty-state">Memuat data produk...</div>
        ) : filteredLinks.length > 0 ? (
          <>
            {filteredLinks.slice(0, visibleCount).map((link) => (
              <LinkCard
                key={link.id}
                title={link.title}
                category={link.category}
                url={link.url}
                image={link.image}
                isFeatured={link.isFeatured}
              />
            ))}
            
            {/* Sentinel loader element for triggering Infinite Scroll */}
            {visibleCount < filteredLinks.length && (
              <div ref={sentinelRef} className="sentinel-loader">
                <div className="subtle-spinner"></div>
                <span>Memuat produk lainnya...</span>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            Produk "{searchVal}" tidak ditemukan. Coba kata kunci lain.
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()}{' '}
          <a 
            href="https://highproduct.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-brand"
          >
            HighProduct
          </a>
          . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
