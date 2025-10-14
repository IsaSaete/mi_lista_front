import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";

const MenuPage: React.FC = () => {
  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector />;
    </>
  );
};

export default MenuPage;
