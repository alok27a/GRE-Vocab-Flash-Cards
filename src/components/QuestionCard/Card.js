import React, { useState } from 'react';
import { Box, Button, HStack, useColorMode } from '@chakra-ui/react';
import '@fontsource/mali';
import '@fontsource/poppins';


const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { colorMode } = useColorMode();

  const reviewLater = (e) => {
    e.stopPropagation(); // Prevents the flip action when clicking the button
    console.log("Review Later");
  };

  const knewIt = (e) => {
    e.stopPropagation(); // Prevents the flip action when clicking the button
    console.log("Knew It");
  };

  return (
    <Box
      position="relative"
      width={['100%', '450px', '600px']}
      height={['150px', '225px', '300px']}
      perspective="1000px"
      cursor="pointer"
      margin="0 auto"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        transition="transform 0.8s"
        transformStyle="preserve-3d"
        transform={isFlipped ? 'rotateY(180deg)' : 'none'}
        alignContent={'center'}
        alignItems={'center'}
      >
        {/* Front of the card */}
        <Box
          position="absolute"
          width="100%"
          height="100%"
          backfaceVisibility="hidden"
          display="flex"
          flexDirection="column"
          bg={colorMode === 'light' ? '#FED7D7': '#34495E'}
          borderRadius="10px"
          transform={isFlipped ? 'rotateY(180deg)' : 'none'} // Reset transform when not flipped
          zIndex="2" // Ensure this is always on top when not flipped
          fontFamily={'Mali'}
          // fontWeight={'bold'}
          fontSize={'6xl'}
          alignItems={'center'} 
          justifyContent={'center'}
        >
          {frontContent}
        </Box>

        {/* Back of the card */}
        <Box
          position="absolute"
          width="100%"
          height="100%"
          backfaceVisibility="hidden"
          display="flex"
          flexDirection="column"
          justifyContent={'space-between'}
          bg={colorMode === 'light' ? '#ECF0F1' : '#2C3E50'}
          transform="rotateY(180deg)" // This rotation is key for the flip effect
          borderRadius="10px"
          zIndex={isFlipped ? '2' : '1'} // Ensure this comes to top when flipped
          
        >
          <Box p="10px" textAlign="center" fontFamily={'Poppins'} fontSize={'xl'}>
            {backContent}
          </Box>
          <HStack alignItems="center" justify="center" m="2">
            <Button bg="pink.100" onClick={reviewLater}>
              Review It
            </Button>
            <Button bg="green.400" onClick={knewIt}>
              Knew It
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;
