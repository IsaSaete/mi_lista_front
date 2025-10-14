import { Link } from "react-router";
import "./WorkInProgressPage.css";
import PageTitle from "@/menu/components/PageTitle/PageTitle";

const WorkInProgressPage: React.FC = () => {
  return (
    <div className="main-content">
      <PageTitle title="Página en construcción" />
      <img
        className="work-image"
        src="/work-progress.svg"
        alt=""
        aria-hidden="true"
        width={280}
        height={280}
      />
      <Link className="back-link" to={"/"}>
        <img
          className="back-link__arrow"
          src="/flecha.svg"
          alt=""
          aria-hidden="true"
          height={40}
          width={40}
        />
        Volver
      </Link>
    </div>
  );
};

export default WorkInProgressPage;
