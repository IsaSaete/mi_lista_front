import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  message?: string;
}

const Loader: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex justify-center items-center p-5 w-fit mx-auto"
    >
      <div className="bg-secondary text-foreground flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl h-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
        <Spinner className="size-10 sm:size-12 animate-spin text-inherit " />
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default Loader;
