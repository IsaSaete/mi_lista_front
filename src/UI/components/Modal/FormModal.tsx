import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  description: string;
}

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none w-full p-4">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
