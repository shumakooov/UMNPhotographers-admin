import { PropsWithChildren } from "react";
import "./wrapper-with-actions.css";

export default function WrapperWithActions({
  actions = null,
  p = 0,
  children,
  ...props
}: PropsWithChildren<any>) {
  return (
    <div className="wrapper" {...props}>
      {actions && (
        <div className="wrapper__actions shadow-container">{actions}</div>
      )}
      <div
        className="wrapper__container shadow-container"
        style={{ padding: p }}
      >
        {children}
      </div>
    </div>
  );
}
