import React from 'react';

const Header = () => {
  // Social link endpoints - mapping directly to your account details
  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/high_product02/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@high_product02',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2A10 10 0 0 0 2 12c0 2.2.7 4.3 2 6l1.5-1.5a8 8 0 1 1 13-4.5c0 1.5-1.2 2.5-2.5 2.5S13 13.5 13 12a1 1 0 0 1 2 0c0 .3.2.5.5.5s.5-.2.5-.5V8a1 1 0 0 0-2 0v1.5a4 4 0 1 0 1 5.5l1.5 1.5a10 10 0 0 0 2-6A10 10 0 0 0 12 2z"></path>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@high_product02',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@highproduct02',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61590986811734',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    }
  ];

  return (
    <header className="header">
      <div className="avatar-container">
        <img 
          src={`${import.meta.env.BASE_URL}logo.jpeg`} 
          alt="HighProduct Logo" 
          className="avatar" 
          onError={(e) => {
            // Fallback if logo is missing or load fails
            e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
          }}
        />
        <div className="verified-badge" title="Verified Creator">✓</div>
      </div>
      <h1 className="brand-name">HighProduct</h1>
      <p className="description">
        Menemukan produk viral unik yang membuat hidup lebih praktis dan mudah. 
        Temukan seluruh rekomendasi produk terbaik kami di bawah ini! 👇
      </p>
      <ul className="social-list">
        {socials.map((social) => (
          <li key={social.name}>
            <a 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              aria-label={social.name}
            >
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
