// FlipCard.jsx
import React, { useState } from 'react';
import { Box, Button, HStack, useColorMode } from '@chakra-ui/react';

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { colorMode } = useColorMode();

  const containerStyles = {
    position: 'relative',
    width: '600px',
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
    backgroundColor: colorMode === 'light' ? '#EDF2F7' : 'gray.600',
    borderRadius: '10px',
  };

  const cardSideStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const reviewLater = (e) => {
    e.stopPropagation();
    console.log("Review Later");
  };

  const knewIt = (e) => {
    e.stopPropagation();
    console.log("Knew It");
  };

  return (
    <Box style={containerStyles} onClick={() => setIsFlipped(!isFlipped)}>
      <Box style={flipCardStyles}>
        {/* Front of the card */}
        <Box
          style={{
            ...cardSideStyles,
            backgroundColor: colorMode === 'light' ? 'cyan.400' : 'cyan.600' // Vibrant cyan for front
          }}
        >
          {frontContent}
        </Box>

        {/* Back of the card */}
        <Box
          style={{
            ...cardSideStyles,
            backgroundColor: colorMode === 'light' ? 'orange.400' : 'orange.600', // Warm orange for back
            transform: 'rotateY(180deg)'
          }}
        >
          <Box style={{ padding: '10px', textAlign: 'center' }}>
            {backContent}
          </Box>
          <HStack alignItems="center" align="center" m="2">
            <Button bg="pink.100" onClick={(e) => reviewLater(e)}>
              Review It
            </Button>


            <Button  bg="green.400" onClick={(e) => knewIt(e)}>
              Knew It
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;
