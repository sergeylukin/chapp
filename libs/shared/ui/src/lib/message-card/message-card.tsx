import { useState } from 'react';
import Linkify from 'react-linkify';
import { useTheme } from '@chakra-ui/react';
import { MessageWithUser } from '@chapp/api-interfaces';
import { Link, Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { useStoreActions } from '@chapp/shared-state';
import { Buffer } from 'buffer/';

/* eslint-disable-next-line */
export interface MessageCardProps {
  message: MessageWithUser;
  needsVisualRepairment?: boolean | null;
}

export function MessageCard({
  message,
  needsVisualRepairment = false,
}: MessageCardProps) {
  const [isFixed, setIsFixed] = useState(false);
  const { fixMessagePositioning } = useStoreActions(
    (actions) => actions['messageModel']
  );

  const avatarBase64 = Buffer.from(message.user.avatar as string).toString(
    'base64'
  );
  const avatarImageURL = `data:image/svg+xml;base64,${avatarBase64}`;

  const theme = useTheme();

  const avatarSize = 'lg';

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
          height:
            theme['sizes'][
              theme['components'].Avatar.sizes[avatarSize].container.height
            ],
          width:
            theme['sizes'][
              theme['components'].Avatar.sizes[avatarSize].container.width
            ],
          cursor: needsVisualRepairment ? 'pointer' : '',
          position: 'relative',
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
          size={avatarSize}
          src={avatarImageURL}
          className={needsVisualRepairment ? 'u-anim-jump' : ''}
          mt={needsVisualRepairment ? 0 : 2}
          left={needsVisualRepairment ? -4 : 0}
          position="absolute"
        ></Avatar>
      </Box>
      <Flex
        bg="gray.100"
        color="black"
        minW="100px"
        maxW="350px"
        mt={5}
        ml={3}
        p="3"
        borderRadius={5}
        position="relative"
      >
        <Text>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <Link
                color="teal.500"
                isExternal
                href={decoratedHref}
                key={key}
                rel="noreferrer"
              >
                {decoratedText.slice(0, 15)}...
              </Link>
            )}
          >
            {message.body}
          </Linkify>
        </Text>
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
