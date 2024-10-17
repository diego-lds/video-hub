import React from "react";

const Footer: React.FC<any> = () => {
  return (
    <footer className="w-full h-30   border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs bg-emerald-600">
      <p>
        <a
          className="text-white hover:underline"
          href="https://github.com/diego-lds"
        >
          Criado por Diego Lopes &copy; {new Date().getFullYear()}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
