import BodyContainer from '../components/bodyContainer';
import Header from '../components/header';
import Channels from '../components/channels';
import Messages from '../components/messages';
import AddChannelModal from '../components/modals/addChannelModal';
import RemoveChannelModal from '../components/modals/removeChannelModal';
import RenameChannelModal from '../components/modals/renameChannelModal';

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
