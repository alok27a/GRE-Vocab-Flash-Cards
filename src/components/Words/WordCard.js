import React, { useState } from 'react';
import { HStack, Select, Button, Text, Flex, Box } from '@chakra-ui/react';
import ReactCardFlip from 'react-card-flip';
import FlipCard from '../QuestionCard/Card';

const WordCard = () => {

  return (
    <>
      <Text fontSize='2xl' fontWeight='bold' textAlign='center' m={10}>
        Select Wordlist
      </Text>
      <Flex direction="row" justify="center" align="center" m={10} p={2}>
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

        {/* Submit */}
        <Button colorScheme='teal' size='md'>
          Submit
        </Button>
      </Flex>

      {/* Word Display in Card */}

      <FlipCard
        frontContent={<div>front?</div>}
        backContent={<div>back!</div>}
      />



    </>
  );
};

export default WordCard;
