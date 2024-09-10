import Header from '../components/Header.jsx';
import BodyContainer from '../components/BodyContainer.jsx';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import AddChannelModal from '../components/modals/AddChannelModal.jsx';
import RemoveChannelModal from '../components/modals/RemoveChannelModal.jsx';
import RenameChannelModal from '../components/modals/RenameChannelModal.jsx';

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
