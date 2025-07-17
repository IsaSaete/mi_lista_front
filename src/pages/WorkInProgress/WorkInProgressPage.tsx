import { Link } from "react-router";
import "./WorkInProgressPage.css";

const WorkInProgressPage: React.FC = () => {
  return (
    <div className="main-content">
      <h1 className="page-title">Página en construcción</h1>
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
