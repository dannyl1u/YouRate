import React, { useState } from 'react';

const WordCloud = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const response = await fetch('/wordcloud');
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } else {
        console.error('Failed to fetch word cloud:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch word cloud:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Word Cloud</button>
      {imageUrl && <img src={imageUrl} alt="Word Cloud" />}
    </div>
  );
};

export default WordCloud;
