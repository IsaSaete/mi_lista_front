import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/components/MenuSection/MenuSection";

const MenuPage: React.FC = () => {
  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector />
      <MenuSection titleMenu="comida" />
      <MenuSection titleMenu="cena" />
    </>
  );
};

export default MenuPage;
