import { createPortal } from 'react-dom';
import { Component } from 'react';
import React from 'react';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount = () => {
    window.addEventListener('keydown', this.closeByEsc);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeByEsc);
  };
  render() {
    const { closeModal, modalImage } = this.props;
    return createPortal(
      <div
        className="Overlay"
        onClick={e => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="Modal">
          <img src={modalImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
