import Navigation from "../../../UI/components/Navigation/Navigation";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Navigation isMobile={false} />
    </div>
  );
};

export default HomePage;
