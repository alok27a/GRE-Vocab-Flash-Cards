import React from 'react';
import { Select, Button, Text, Flex, Box, VStack, useColorModeValue, HStack } from '@chakra-ui/react';
import FlipCard from '../QuestionCard/Card';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'; // Importing icons

const WordCard = () => {
  const bg = useColorModeValue('white', 'gray.800'); // Adjusts background color
  const color = useColorModeValue('gray.800', 'white'); // Adjusts text color

  const handleNext = () => {
    // Functionality for next button
  };

  const handlePrevious = () => {
    // Functionality for previous button
  };

  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  const user = getUserData();
  

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
      >

        {/* Selecting type of word list */}
        <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2} >
          <option value='GregMat'>GregMat</option>
          <option value='Magoosh'>Magoosh</option>
          <option value='Barrons'>Barron's 333</option>
        </Select>

        {/* Selecting words like learned, review, and all */}
        <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2}>
          <option value='option1'>View All Words</option>
          <option value='option2'>Review Later Only</option>
          <option value='option3'>Already Knew Only</option>
          <option value='option3'>Remaining Words</option>
        </Select>

        {/* Selecting words like learned, review, and all */}
        {/* <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select> */}

        {/* Submit Button with Icon */}
        <Button bg="green.400" size='md' leftIcon={<FaCheck />}>
          Submit
        </Button>
      </Flex>

      <VStack spacing={4} mt={5}>
        {/* FlipCard Component */}
        <FlipCard
          frontContent={<div>Front</div>}
          backContent={<div>Back</div>}
        />

        <HStack mt={4}>
          {/* Previous Button with Icon */}
          <Button onClick={handlePrevious} leftIcon={<FaArrowLeft />}>
            Previous
          </Button>

          {/* Next Button with Icon */}
          <Button bg="blue.100" onClick={handleNext} rightIcon={<FaArrowRight />}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WordCard;
