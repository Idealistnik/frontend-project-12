const BodyContainer = ({ children }) => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">{children}</div>
    </div>
  </div>
);

export default BodyContainer;
