import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SharedConfigProps {}

const StyledSharedConfig = styled.div`
  color: pink;
`;

export function SharedConfig(props: SharedConfigProps) {
  return (
    <StyledSharedConfig>
      <h1>Welcome to SharedConfig!</h1>
    </StyledSharedConfig>
  );
}

export default SharedConfig;
