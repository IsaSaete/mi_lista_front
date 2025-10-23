import type { MenuType } from "@/menu/types";

interface MenuSectionProps {
  titleMenu: MenuType;
  recipe: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  titleMenu: menuType,
  recipe = "",
}) => {
  return (
    <>
      <div className="bg-secondary rounded-2xl p-6 space-y-4 mb-5">
        <h2 className="text-3xl uppercase font-bold underline text-center pb-2 m-0">
          {menuType}
        </h2>
        <div className="min-h-[80px] flex justify-center text-center">
          <p className="text-muted-foreground italic">
            {" "}
            {recipe ? recipe : "Sin receta asignada"}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <button className="bg-primary hover:bg-background text-foreground font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-3 focus:ring-secondary-hover">
            {recipe ? "Editar" : "Añadir"}
          </button>
          <button className="bg-primary hover:bg-background text-foreground font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-3 focus:ring-secondary-hover">
            Ingredientes
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
