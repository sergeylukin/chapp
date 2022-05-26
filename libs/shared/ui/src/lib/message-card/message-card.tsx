import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface MessageCardProps {}

const StyledMessageCard = styled.div`
  color: pink;
`;

export function MessageCard(props: MessageCardProps) {
  return (
    <StyledMessageCard>
      <h1>Welcome to MessageCard!</h1>
    </StyledMessageCard>
  );
}

export default MessageCard;
