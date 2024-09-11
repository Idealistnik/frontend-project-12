import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import {
  setChannelToRemove,
  setChannelToRename,
} from '../slices/channelSlice';
import {
  setPressedChannel,
  getPressedChannelId,
  setPressedRemoveChannel,
  setPressedRenameChannel,
} from '../slices/uiSlice';

const Channel = (
  {
    id,
    name,
    t,
    removable,
  },
) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getPressedChannelId);
  const handleClick = (currentId) => {
    dispatch(setPressedChannel(+currentId));
  };
  const handleRemoveChannel = (currentId) => {
    dispatch(setPressedRemoveChannel(true));
    dispatch(setChannelToRemove(+currentId));
  };

  const handleRenameChannel = (currentId) => {
    dispatch(setPressedRenameChannel(true));
    dispatch(setChannelToRename(+currentId));
  };
  return (
    <Nav.Item as="li" key={id} className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={currentChannelId === +id ? 'secondary' : ''}
          onClick={() => handleClick(id)}
          className="w-100 rounded-0 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        {!removable ? null : (
          <>
            <Dropdown.Toggle
              split
              variant={currentChannelId === +id ? 'secondary' : ''}
              id="dropdown-split-basic"
              className="flex-grow-0"
            >
              <span className="visually-hidden">{t('channels.menu')}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleRemoveChannel(id)}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleRenameChannel(id)}
              >
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
