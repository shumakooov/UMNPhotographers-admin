import { PropsWithChildren } from "react";
import "./wrapper-with-actions.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export default function WrapperWithActions({
  actions = null,
  p = 0,
  children,
  ...props
}: PropsWithChildren<{
  actions?: ReactJSXElement | null;
  p?: number | string;
}>) {
  return (
    <div className="wrapper" style={{ padding: p }} {...props}>
      {actions && (
        <div className="wrapper__actions shadow-container">{actions}</div>
      )}
      <div className="wrapper__container shadow-container">{children}</div>
    </div>
  );
}
