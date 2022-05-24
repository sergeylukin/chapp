import ChatRoomView from './room';
import LoginView from './login';

import { useStoreState } from '../store/hooks';

export function Home() {
  const isInsideRoom = useStoreState((store) => store['userModel'].hasRoom);

  return isInsideRoom ? <ChatRoomView /> : <LoginView />;
}

export default Home;
