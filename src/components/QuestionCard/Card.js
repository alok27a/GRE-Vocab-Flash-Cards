// FlipCard.jsx
import React, { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

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
    flexDirection: 'column', // Change to column layout
    justifyContent: 'space-between', // Distribute space between content and buttons
  };

  const reviewLater = (e) => {
    e.stopPropagation();
    console.log("Review Later");
    // Implement the logic or API call to mark the word for review later
  };

  const knewIt = (e) => {
    e.stopPropagation();
    console.log("Knew It");
    // Implement the logic or API call to mark the word as known
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
          <Box style={{ padding: '10px', textAlign: 'center' }}>
            {backContent}
          </Box>
          <HStack alignItems="center" align="center" m="2">
            <Button colorScheme="teal" onClick={(e) => reviewLater(e)}>
              Review It
            </Button>
            <Button colorScheme="pink" onClick={(e) => knewIt(e)}>
              Knew It
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;
