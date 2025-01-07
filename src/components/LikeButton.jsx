import React, { useState } from 'react';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <button onClick={handleLike} className='scale-150'>
        {isLiked ? '❤️' : '🤍'}
      </button>
      <span>{likes} {likes === 1 ? '' : ''}</span>
    </div>
  );
};

export default LikeButton;