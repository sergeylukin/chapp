import styled from '@emotion/styled';
import { MessageWithUser } from '@chapp/api-interfaces';

const StyledFrontWebsiteFeatureFeedList = styled.div`
  color: black;
  with: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding: 3rem;
`;
const NameStyled = styled.span`
  padding-right: 5rem;
`;

/* eslint-disable-next-line */
export interface FrontWebsiteFeatureFeedListProps {
  feed: MessageWithUser[];
}

export function FrontWebsiteFeatureFeedList(
  props: FrontWebsiteFeatureFeedListProps
) {
  const { feed } = props;
  return (
    <StyledFrontWebsiteFeatureFeedList>
      <table>
        {Array.isArray(feed) &&
          feed.map((message) => (
            <tr key={message.id}>
              <td align="left">
                <NameStyled>{`${message.user.username}`}</NameStyled>
              </td>
              <td>
                <small>{message.body}</small>
              </td>
            </tr>
          ))}
      </table>
    </StyledFrontWebsiteFeatureFeedList>
  );
}

export default FrontWebsiteFeatureFeedList;
