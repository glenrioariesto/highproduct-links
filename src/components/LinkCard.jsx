import React from 'react';

const LinkCard = ({ title, category, url, isFeatured }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`link-card ${isFeatured ? 'featured' : ''}`}
    >
      <div className="link-info">
        <span className="link-category">{category}</span>
        <h2 className="link-title">{title}</h2>
      </div>
      <div className="link-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;
