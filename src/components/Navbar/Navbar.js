import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import ToggleTheme from '../ToggleTheme';
import { RxReset } from "react-icons/rx";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';


const Links = [{ name: 'Dashboard', url: '/words' }, { name: 'Progress', url: '/progress' }]; // Update with URL

const NavLink = ({ name, url }) => {
  const navigate = useNavigate(); // Use useNavigate hook

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => navigate(url)} // Navigate on click
      cursor="pointer"
    >
      {name}
    </Box>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate(); // Initialize useNavigate hook

  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  const user = getUserData();
  const toast = useToast();
  // Logout function
  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    navigate('/'); // Redirect to login page or home page
  };

  const askResetConfirmation = () => {
    onOpen();
  };



  const resetProgress = async () => {
    try {
      const user = getUserData();


      const response = await fetch(`https://gre-vocab-flash-cards-backend.vercel.app/userprogress/resetprogress/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });


      toast({
        title: "Progress reset successfully",
        description: "You can have a fresh start now",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      console.error('Error resetting progress:', error);
      const errorResponse = await error.response.json(); // Get the error response body
      console.log('Error details:', errorResponse);
      toast({
        title: "Error resetting progress",
        description: errorResponse.message || "Error resetting progress",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }    
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <ToggleTheme />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} name={link.name} url={link.url} />
              ))}
            </HStack>

          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              bg={'red.400'}
              size={'md'}
              mr={4}
              leftIcon={<RxReset />}
              onClick={askResetConfirmation}
            >
              Reset Progress
            </Button>
            {/* Modal for confirmation */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Reset Progress</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Are you sure you want to reset your progress? This action cannot be undone.</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => { resetProgress(); onClose(); }}>
                    Yes, Reset
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'md'}
                  src={user ? user.userImageUrl : 'path_to_default_avatar_image'}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </Menu>

          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} name={link.name} url={link.url} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
