import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const MessageForm = ({ formik, inputRef, t }) => (
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
        id="inputValue"
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

export default MessageForm;
