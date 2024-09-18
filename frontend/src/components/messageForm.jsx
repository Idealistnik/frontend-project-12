import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import leoProfanity from 'leo-profanity';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import routes from '../routes/routes';
import { addMessage } from '../slices/messagesSlice';

const MessageForm = (
  {
    currentUser,
    channelMessagesList,
    isPressedAddChannel,
    isPressedRemoveChannel,
    isPressedRenameChannel,
    currentChannelId,
    currentToken,
    t,
  },
) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          body: leoProfanity.clean(values.inputValue),
          channelId: currentChannelId,
          username: currentUser,
        };
        const response = await axios.post(routes.messages(), newMessage, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        resetForm();
        dispatch(addMessage(response.data));
      } catch (error) {
        console.error(error);
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [channelMessagesList, isPressedAddChannel, isPressedRemoveChannel, isPressedRenameChannel]);
  return (
    <Form
      className="py-1 border rounded-2"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="input-group has-validation">
        <Form.Control
          ref={inputRef}
          aria-label={t('chat.newMessage')}
          name="inputValue"
          className="border-0 p-0 ps-2"
          required
          type="text"
          placeholder={t('chat.inputMessage')}
          onChange={formik.handleChange}
          value={formik.values.inputValue}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant=""
          className="btn-group-vertical"
          disabled={formik.values.inputValue === '' || formik.isSubmitting}
        >
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
