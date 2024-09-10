import Header from '../components/Header';
import BodyContainer from '../components/BodyContainer';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import AddChannelModal from '../components/modals/AddChannelModal';
import RemoveChannelModal from '../components/modals/RemoveChannelModal';
import RenameChannelModal from '../components/modals/RenameChannelModal';

const MainPage = () => {
  const vdom = (
    <>
      <BodyContainer>
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      </BodyContainer>
      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />
    </>
  );
  return vdom;
};

export default MainPage;
