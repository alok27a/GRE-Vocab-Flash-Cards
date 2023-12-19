import React, { useState } from 'react';
import { Select, Button, Text, Flex, Box, VStack, useColorModeValue } from '@chakra-ui/react';
import FlipCard from '../QuestionCard/Card';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'; // Importing icons
import { useToast } from '@chakra-ui/react'
import { Skeleton } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import animationData from './animation-no-result.json';

const WordCard = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  const bg = useColorModeValue('white', 'gray.800'); // Adjusts background color
  const color = useColorModeValue('gray.800', 'white'); // Adjusts text color

  const [wordListType, setWordListType] = useState('');
  const [option, setOption] = useState('');

  const [words, setWords] = useState([]); // State to store the fetched words
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current word


  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);


  const categorySelection = async () => {
    try {
      setIsLoading(true); // Start loading

      const user = getUserData();
   

      if (!user || !user.token || !wordListType || !option) {
        console.error('User data, word list type, or option is missing');
        return;
      }

      const response = await fetch(`https://gre-vocab-flash-cards-backend.vercel.app/userprogress/words/${user.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the auth token if needed
          'Authorization': `Bearer ${user.token}`, // Assuming the token is stored in user data
        },
        body: JSON.stringify({ "category": wordListType, "option": option }) // Include the body if using 'POST'
      });


      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setWords(data.data); // Assuming the fetched words are in data.data
      setCurrentIndex(0); // Reset to the first word
      toast({
        title: "Words fetched successfully",
        description: "Words fetched successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      console.error('Error fetching words:', error);
      toast({
        title: "Error fetching words",
        description: "Error fetching words",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

    setIsLoading(false); // Stop loading once the API call is complete

  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'End of List',
        description: 'You have reached the end of the word list.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Start of List',
        description: 'You are at the beginning of the word list.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  const user = getUserData();



  const handleReviewLater = async () => {
    const wordId = words[currentIndex]._id; // Assuming each word object has an _id field
    try {
      await fetch(`https://gre-vocab-flash-cards-backend.vercel.app/userprogress/markreviewlater/${wordId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      toast({
        title: "Marked for review later",
        description: "Marked for review later",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error marking word for review later:', error);
      toast({
        title: "Error marking word for review later",
        description: "Error marking word for review later",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  };

  const handleKnewThisWord = async () => {
    const wordId = words[currentIndex]._id;
    try {
      await fetch(`https://gre-vocab-flash-cards-backend.vercel.app/userprogress/markknewthisword/${wordId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      toast({
        title: "Marked as knew this word",
        description: "Marked as knew this word",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error marking word as known:', error);
      toast({
        title: "Error marking word as known",
        description: "Error marking word as known",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  };


  const disabledBtnBg = useColorModeValue('gray.200', 'gray.600'); // Adjust colors for light/dark mode
  const disabledBtnColor = useColorModeValue('gray.400', 'gray.800');


  return (
    <Box bg={bg} color={color} p={5} borderRadius="lg">
      <Text fontSize='2xl' fontWeight='bold' textAlign='start' m={4}>
        Hi {user.fullName}, Select a Wordlist
      </Text>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align={{ base: 'center', md: 'center' }}
        wrap="wrap"
        m={4}
      >

        {/* Selecting type of word list */}
        <Select placeholder='Select Type of List' borderRadius='md' flex="1" minW="150px" m={2}
          onChange={e => setWordListType(e.target.value)}>
          <option value='GregMat'>GregMat</option>
          <option value='Magoosh'>Magoosh</option>
          <option value="Barron's 333">Barron's 333</option>
          <option value='all'>All of the above</option>
        </Select>

        {/* Selecting words like learned, review, and all */}
        <Select placeholder='Select Option' borderRadius='md' flex="1" minW="150px" m={2}
          onChange={e => setOption(e.target.value)}
        >
          <option value='all'>View All Words</option>
          <option value='reviewLater'>Review Later Only</option>
          <option value='knewThisWord'>Completed Only</option>
          <option value='notMarked'>Remaining Words</option>
        </Select>

        {/* Submit Button with Icon */}
        <Button bg="green.400" size='md' leftIcon={<FaCheck />} onClick={categorySelection}>
          Submit
        </Button>
      </Flex>

      <VStack spacing={4} mt={5}>
        {isLoading ? (
          <Skeleton height="300px" width="600px" />
        ) : words.length > 0 ? (
          <>
            <FlipCard
              frontContent={<div>{words[currentIndex].word}</div>} // Display the current word
              backContent={
                <Box display={"flex"} flexDirection={"column"} justifyContent="space-around" alignItems={'center'} >
                  <Box mb={2}>Meaning: {words[currentIndex].meaning}</Box>
                  <Box>Synonyms: {words[currentIndex].synonyms}</Box>
                </Box>
              }
              onReviewLater={handleReviewLater}
              onKnewIt={handleKnewThisWord}
            />



            <Flex mt={4} width="100%" justifyContent="space-around">

              <Button
                onClick={handlePrevious}
                leftIcon={<FaArrowLeft />}
                disabled={currentIndex === 0}
                _disabled={{ bg: disabledBtnBg, color: disabledBtnColor }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                rightIcon={<FaArrowRight />}
                disabled={currentIndex === words.length - 1}
                _disabled={{ bg: disabledBtnBg, color: disabledBtnColor }}
              >
                Next
              </Button>


            </Flex>
          </>
        ) : <>
          <Text fontSize='2xl' fontWeight='bold' textAlign='center' m={4}>No words to display</Text>
          <Box display="flex" justifyContent="center" alignItems="center" >
            <Lottie options={defaultOptions} height={200} width={200} />
          </Box>
        </>
        }
      </VStack>
    </Box>
  );
};

export default WordCard;