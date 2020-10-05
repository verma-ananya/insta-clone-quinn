import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './modalView.css';
import { Link } from 'react-router-dom';

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    render() { 
      const {
        title,
        header,
        footer,
        children,
        onClose,
        size,
        onNext,
        onPrevious,
      } = this.props;
      
      return (
        <Modal show={true} onHide={onClose} size={size} centered>
          {title && <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>}

          {header && <Modal.Header closeButton>
            {header}
          </Modal.Header>}

          <Modal.Body className="pad-0">
            <div className="container-fluid pad-0">
              <div className="row pad-0 modal-row">
                <div className="pad-0 col-1">
                  <Link> <i className="material-icons arrow" onClick={onPrevious}> navigate_before </i> </Link>
                </div>
                <div className="pad-4 col-10">
                  {children}
                </div>
                <div className="pad-0 col-1">
                  <Link> <i className="material-icons arrow" onClick={onNext}> navigate_next </i> </Link>
                </div>
              </div>
            </div>
          </Modal.Body>

          {footer && <Modal.Footer>
            {footer}
          </Modal.Footer>}
        </Modal>
      );
  }
}

ModalView.defaultProps = {
  title : null,
  footer: null,
};
 
export default ModalView;