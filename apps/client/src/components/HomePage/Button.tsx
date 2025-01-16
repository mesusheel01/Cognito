import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const { title, routeTo } = props;
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(routeTo)}
      className="p-2 hover:py-1.5 hover:px-3 mt-1 px-4 rounded-xl bg-backCol hover:shadow-2xl font-semibold hover:font-normal hover:bg-myGreen transition-all duration-500"
    >
      {title}
    </button>
  );
};

export default Button;
