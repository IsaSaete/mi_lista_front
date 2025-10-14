import type { MenuType } from "@/menu/types";

interface MenuSectionProps {
  titleMenu: MenuType;
}

const MenuSection: React.FC<MenuSectionProps> = ({ titleMenu: menuType }) => {
  return (
    <>
      <div className="bg-sage rounded-2xl p-6 space-y-4 mb-5">
        <h2 className="text-3xl uppercase font-bold underline text-center pb-2 m-0">
          {menuType}
        </h2>
        <div className="min-h-[80px] flex justify-center text-center">
          <p className="text-muted-foreground italic">Sin receta asignada</p>
        </div>
        <div className="flex w-full justify-between">
          <button className="bg-primary hover:bg-background text-foreground font-semibold px-6 py-2 rounded-lg transition-colors">
            Editar
          </button>
          <button className="bg-primary hover:bg-background text-foreground font-semibold px-6 py-2 rounded-lg transition-colors">
            Ingredientes
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
