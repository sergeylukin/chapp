import { useState, useEffect, useRef } from 'react';
import { MessageWithUser } from '@chapp/api-interfaces';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { useStoreActions } from '@chapp/shared-state';

/* eslint-disable-next-line */
export interface MessageCardProps {
  message: MessageWithUser;
  needsVisualRepairment: boolean | null;
}

export function MessageCard({
  message,
  needsVisualRepairment = false,
}: MessageCardProps) {
  const [isFixed, setIsFixed] = useState(false);
  const { fixMessagePositioning } = useStoreActions(
    (actions) => actions['messageModel']
  );

  return (
    <Flex w="100%">
      <Box
        onClick={() => {
          if (needsVisualRepairment) {
            setIsFixed(true);
            fixMessagePositioning(message);
          }
        }}
        className={isFixed ? 'u-fixed-message' : 'u-to-be-fixed'}
        sx={{
          ml: 2,
          cursor: needsVisualRepairment ? 'pointer' : '',
          '&:hover': needsVisualRepairment
            ? {
                transform: 'scale(1.07)',
                zIndex: 999,
              }
            : {},
        }}
      >
        <Avatar
          name="Computer"
          src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          bg="blue.300"
          borderWidth="2px"
          borderStyle="solid"
          borderColor={needsVisualRepairment ? 'red.500' : 'green.100'}
          className={needsVisualRepairment ? 'u-anim-jump' : ''}
          mt={needsVisualRepairment ? 1 : 2}
        ></Avatar>
      </Box>
      <Flex
        bg="gray.100"
        color="black"
        minW="100px"
        maxW="350px"
        my="2"
        ml={3}
        p="3"
        borderRadius={5}
        position="relative"
      >
        <Text>{message.body}</Text>
        <Text
          borderRadius={6}
          py={0}
          px={4}
          bgColor={'gray.200'}
          sx={{ position: 'absolute', top: -2, left: -1 }}
          fontSize="xs"
        >
          {message.user.name}
        </Text>
      </Flex>
    </Flex>
  );
}

export default MessageCard;
