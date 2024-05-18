import { createPortal } from "react-dom";
import { useImperativeHandle, forwardRef, useRef } from "react";
import Button from "./Button";

const modalRoot = document.getElementById("modal-root");

const modal = forwardRef(function Modal(props, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {props.children}
      <form method="dialog" className="mt-4 text-right">
        <Button>Close</Button>
      </form>
    </dialog>,
    modalRoot
  );
});

export default modal;
