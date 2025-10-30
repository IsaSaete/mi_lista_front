import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--secondary-color)",
          "--border-radius": "20px",
          "--success-bg": "var(--secondary-color)",
          "--success-text": "#fff",
          "--info-bg": "var(--primary-color)",
          "--info-text": "#fff",
          "--warning-bg": "#fff3cd",
          "--warning-text": "#000",
          "--error-bg": "#ff8270",
          "--error-text": "cf0f0f",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
