const Footer: React.FC = () => {
  return (
    <footer className="w-full p-5 text-center mt-auto flex flex-col">
      <div className="flex justify-center gap-3 mb-2">
        <span className="text-xl">♻️</span>
        <span className="text-xl">🍃</span>
        <span className="text-xl">🌍</span>
      </div>
      <p className="text-secondary-hover font-semibold text-sm">
        Pequeños planes, grandes impactos
      </p>
      <p className="text-foreground text-xs mt-1">
        Mi Menú © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
