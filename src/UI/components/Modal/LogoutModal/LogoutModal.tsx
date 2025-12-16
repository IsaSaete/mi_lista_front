interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          className="absolute inset-0 bg-black/70"
          onClick={handleClose}
        />
        <div className="relative bg-background rounded-2xl p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-foreground mb-5 text-center">
            {title}
          </h2>
          {message && (
            <p className="text-gray-600 mb-6 text-center">{message}</p>
          )}
          <div className="flex justify-between gap-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg font-medium text-background hover:bg-primary hover:text-foreground bg-gray-700 flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-lg font-medium text-background hover:bg-primary hover:text-foreground bg-secondary-hover flex-1"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default LogoutModal;
