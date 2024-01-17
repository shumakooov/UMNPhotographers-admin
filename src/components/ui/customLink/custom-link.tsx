import { Link, useMatch } from "react-router-dom";
import "./custom-link.css";

export default function CustomLink({
  title,
  to,
  activeMainPage,
}: {
  title: string;
  to: string;
  activeMainPage: string;
}) {
  const match = useMatch(to);

  const matchStyles = match
    ? { color: "#2196F3", borderBottom: "2px solid #2196F3" }
    : { color: "#79747E" };

  return (
    <Link
      className="link"
      to={to}
      style={{
        ...matchStyles,
        padding: 9,
        fontSize: 14,
        fontWeight: "500",
      }}
    >
      {title}
    </Link>
  );
}
