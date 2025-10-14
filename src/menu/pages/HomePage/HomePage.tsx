import type React from "react";
import Navigation from "../../../UI/components/Navigation/Navigation";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-[calc(80vh-4rem)]">
      <Navigation />
    </div>
  );
};

export default HomePage;
