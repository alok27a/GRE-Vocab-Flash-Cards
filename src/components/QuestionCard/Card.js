// FlipCard.jsx
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const containerStyles = {
    position: 'relative',
    width: '200px',
    height: '300px',
    perspective: '1000px',
    cursor: 'pointer',
  };

  const flipCardStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'none',
    backgroundColor: 'khaki',
  };

  const cardSideStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Box style={containerStyles} onClick={() => setIsFlipped(!isFlipped)}>
      <Box style={flipCardStyles}>
        {/* Front of the card */}
        <Box
          style={{ ...cardSideStyles, backgroundColor: 'blue.100' }}
        >
          {frontContent}
        </Box>

        {/* Back of the card */}
        <Box
          style={{ 
            ...cardSideStyles, 
            backgroundColor: 'orange.100', 
            transform: 'rotateY(180deg)' 
          }}
        >
          {backContent}
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;
