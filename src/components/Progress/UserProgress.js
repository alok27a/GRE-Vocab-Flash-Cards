import React, { useState, useEffect } from 'react';
import { Progress, Box, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

const UserProgress = ({ userId }) => {
  const [progressData, setProgressData] = useState({
    totalWords: 0,
    knownWords: 0,
    reviewWords: 0,
  });
  const [loading, setLoading] = useState(true);


  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }


  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);

      const user = getUserData();

      try {
        const response = await fetch(`https://gre-vocab-flash-cards-backend.vercel.app/userprogress/progress/${user.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // Include the auth token in the request headers
          },
        });


        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProgressData(data.data);


      } catch (error) {
        console.error("Error fetching user's progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  const { totalWords, knownWords, reviewWords, remainingWords, totalWordsSeen } = progressData;
  const knownProgress = totalWords ? (knownWords / totalWordsSeen) * 100 : 0;
  const reviewProgress = totalWords ? (reviewWords / totalWordsSeen) * 100 : 0;

  // Responsive font size
  const fontSize = useBreakpointValue({ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' });

  return (
    <VStack spacing={6} p={4}>
      <Text fontSize={fontSize} fontWeight="bold" mb={4}>
        Your Progress
      </Text>
      {!loading && (
        <>
          <Box w="full">
            <Text fontSize={"xl"} m={2}>Words Remaining: {remainingWords}/{totalWords}</Text>
            <Progress value={100 - ((remainingWords / totalWords) * 100)} size="lg" colorScheme="gray" />
          </Box>

          <Box w="full">
            <Text fontSize={"xl"} m={2}>Words Known: {knownWords}/{totalWordsSeen}</Text>
            <Progress value={knownProgress} size="lg" colorScheme="green" />
          </Box>

          <Box w="full">
            <Text fontSize={"xl"} m={2}>Words to Review: {reviewWords}/{totalWordsSeen}</Text>
            <Progress value={reviewProgress} size="lg" colorScheme="orange"/>
          </Box>
        </>
      )}
      {loading && (
        <Box w="full">
          <Progress size="lg" isIndeterminate colorScheme="blue" />
        </Box>
      )}
    </VStack>
  );
};

export default UserProgress;
