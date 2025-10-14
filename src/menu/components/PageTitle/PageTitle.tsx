import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-semibold text-center pb-2 my-4 uppercase">
      {title}
    </h2>
  );
};

export default PageTitle;
