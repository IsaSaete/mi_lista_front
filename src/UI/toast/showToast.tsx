import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

type ToastType = "success" | "error";

const showToast = (
  type: ToastType,
  title: string,
  description?: string,
): void => {
  const icons: Record<ToastType, React.ReactNode> = {
    success: (
      <CheckCircle
        className="w-9 h-9 text-secondary-hover"
        aria-hidden="true"
      />
    ),
    error: <XCircle className="w-9 h-9 text-error" aria-hidden="true" />,
  };

  const backgroundColors: Record<ToastType, string> = {
    success: "bg-background border-secondary-hover",
    error: "bg-background border-error",
  };

  const textColors: Record<ToastType, string> = {
    success: "text-green-800",
    error: "text-red-800",
  };

  toast.custom(
    (toastInstanceId) => (
      <div
        className={`flex items-center gap-4 p-4 rounded-lg border-3 shadow-xl w-full max-w-sm ${backgroundColors[type]} ${textColors[type]}`}
        role="alert"
        aria-live="assertive"
      >
        <span>{icons[type]}</span>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {description && <p className="text-sm pt-2">{description}</p>}
        </div>
        <button
          className="text-sm font-medium shadow-xl text-white hover:scale-105 transition-transform duration-300 ease-in-out bg-secondary-hover py-2 px-3 rounded-md focus:outline-none focus:ring-3 focus:ring-primary"
          onClick={() => toast.dismiss(toastInstanceId)}
          aria-label="Cerrar notificación"
        >
          Cerrar
        </button>
      </div>
    ),
    {
      duration: 30_000,
      position: "top-center",
    },
  );
};
export default showToast;
