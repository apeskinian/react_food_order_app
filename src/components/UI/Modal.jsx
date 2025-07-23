import { useRef } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom"
// using createPortal to be able to inject the returned jsx into an element
// in the DOM as specified in the second argument.
export default function Modal({ children, open, className }) {
    const cssClasses = className ? `modal ${className}` : 'modal'
    // creating a ref for the dialog so we can access it with useEffect and
    // open it programmatically so we still get the dimmed background effect
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }
        // cleanup function only runs when the value changes
        return () => modal.close();
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={cssClasses}>{children}</dialog>
        , document.getElementById('modal')
    );
}