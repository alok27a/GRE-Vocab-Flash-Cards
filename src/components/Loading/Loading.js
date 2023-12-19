import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json'; // Import your animation file
import { Box } from '@chakra-ui/react';

const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
};

export default LoadingScreen;
