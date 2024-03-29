import { Suspense } from "react";
import { Modal as BasicModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import CloseIcon from "@/assets/close.svg";

import styles from "./index.module.less";

import type { CSSProperties, FC } from "react";
import type { ModalProps as BasicModalProps } from "react-responsive-modal";

interface ModalProps extends BasicModalProps {
  width?: number | string;
  closable?: boolean;
  modalStyles?: CSSProperties;
  afterClose?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  width = 1000,
  closable = false,
  afterClose = () => {},
  ...props
}) => {
  const onClose = () => {
    props.onClose?.();
    setTimeout(() => {
      afterClose();
    }, props.animationDuration || 300);
  };

  return (
    <>
      <BasicModal
        {...props}
        classNames={{
          modal: styles.modal,
        }}
        styles={{
          modal: {
            width: "calc(100% - 100px)",
            maxWidth: width,
            ...props.modalStyles,
          },
        }}
        onClose={onClose}
        closeIcon={
          closable && (
            <CloseIcon
              className={styles.closeIcon}
              data-testid="modal-close-button"
            />
          )
        }
        center
      >
        <Suspense>{children}</Suspense>
      </BasicModal>
    </>
  );
};

export default Modal;
