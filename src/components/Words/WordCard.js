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

  return (
    <Box bg={bg} color={color} p={5} borderRadius="lg">
      <Text fontSize='2xl' fontWeight='bold' textAlign='center' mb={6}>
        Select Wordlist
      </Text>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align={{ base: 'center', md: 'center' }}
        wrap="wrap"
      >

        {/* Selecting type of word list */}
        <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2} >
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        {/* Selecting words like learned, review, and all */}
        <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        {/* Selecting words like learned, review, and all */}
        <Select placeholder='Select option' borderRadius='md' flex="1" minW="150px" m={2}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        {/* Submit Button with Icon */}
        <Button colorScheme='teal' size='md' leftIcon={<FaCheck />}>
          Submit
        </Button>
      </Flex>

      <VStack spacing={4} mt={5}>
        {/* FlipCard Component */}
        <FlipCard
          frontContent={<div>Front</div>}
          backContent={<div>Back</div>}
        />

        <HStack>
          {/* Previous Button with Icon */}
          <Button onClick={handlePrevious} leftIcon={<FaArrowLeft />}>
            Previous
          </Button>

          {/* Next Button with Icon */}
          <Button onClick={handleNext} rightIcon={<FaArrowRight />}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WordCard;
