import { Link, useMatch } from "react-router-dom";
import "./customLink.css";

export default function CustomLink({
  title,
  to,
}: {
  title: string;
  to: string;
}) {
  const match = useMatch(to);

  console.log(match);

  const matchStyles = match
    ? { color: "#2196F3", borderBottom: "2px solid #2196F3" }
    : { color: "#79747E" };

  return (
    <Link className="link" to={to} style={{ ...matchStyles, padding: 9 }}>
      {title}
    </Link>
  );
}
