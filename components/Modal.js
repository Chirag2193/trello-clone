import { Dialog } from "primereact/dialog";

export default function Modal({open, close, children, ...options}) {
    return (
        <Dialog visible={open} {...options} onHide={close}>
            {children}
        </Dialog>
    )
}