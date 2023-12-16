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
    cursor: 'pointer'
  };

  const flipCardStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'none'
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
          style={{ 
            ...cardSideStyles, 
            backgroundColor: 'lightblue' // Front side color
          }}
        >
          <Box style={{ position: 'absolute' }}>
            {frontContent}
          </Box>
        </Box>

        {/* Back of the card */}
        <Box
          style={{ 
            ...cardSideStyles, 
            backgroundColor: 'lightcoral', // Back side color
            transform: 'rotateY(180deg)' 
          }}
        >
          <Box style={{ position: 'absolute' }}>
            {backContent}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;
