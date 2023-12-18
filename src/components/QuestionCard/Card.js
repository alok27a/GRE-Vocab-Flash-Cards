import React, { useState } from 'react';
import { Box, Button, HStack, useColorMode } from '@chakra-ui/react';
import '@fontsource/mali';
import '@fontsource/poppins';

const FlipCard = ({ frontContent, backContent, onReviewLater, onKnewIt }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { colorMode } = useColorMode();



  return (
    <Box
      position="relative"
      width={['90%', '450px', '600px']} // Use a percentage width for smaller screens
      height={['300px', '225px', '300px']} // Adjust the height for smaller screens
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
      >
        {/* Front of the card */}
        <Box
          position="absolute"
          width="100%"
          height="100%"
          backfaceVisibility="hidden"
          display="flex"
          flexDirection="column"
          bg={colorMode === 'light' ? '#E2E8F0': '#34495E'}
          borderRadius="10px"
          transform={isFlipped ? 'rotateY(180deg)' : 'none'}
          zIndex="2"
          fontFamily={'Mali'}
          fontSize={['2xl', '4xl', '6xl']} // Adjust font size for different screen sizes
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
          transform="rotateY(180deg)"
          borderRadius="10px"
          zIndex={isFlipped ? '2' : '1'}
          fontSize={['md', 'lg', 'xl']} // Adjust font size for different screen sizes
        >
          <Box p="10px" textAlign="center" fontFamily={'Poppins'}>
            {backContent}
          </Box>
          <HStack alignItems="center" justify="center" m="2">
            <Button bg="pink.100" color={"black"} onClick={onReviewLater}>
              Review It
            </Button>
            <Button bg="green.400"  color={"black"} onClick={onKnewIt}>
              Completed
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCard;