import { PropsWithChildren } from "react";
import "./wrapperWithActions.css";

export default function WrapperWithActions({
  actions,
  p = 0,
  children,
  ...props
}: PropsWithChildren<any>) {
  return (
    <div className="wrapper" {...props}>
      <div className="wrapper__actions shadow-container">{actions}</div>
      <div
        className="wrapper__container shadow-container"
        style={{ padding: p }}
      >
        {children}
      </div>
    </div>
  );
}
