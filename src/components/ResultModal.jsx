import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

const ResultModal = forwardRef (function ResultModal ({remainingTime, targetTime, onReset}, ref) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed (2);
  const dialog = useRef ();
  const score = Math.round ((1 - remainingTime / targetTime * 1000 ) * 100)
  useImperativeHandle (ref, () => {
    return {
      open () {
        dialog.current.showModal();
      }
    }
  }, [ref]);

  return createPortal (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2> Yoy Lost</h2>}
      {!userLost && <h2> Your score: {score}</h2>}
      <p>The target time was < string> {targetTime} seconds.</string></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>, document.getElementById ('modal')
  )
})

export default ResultModal;