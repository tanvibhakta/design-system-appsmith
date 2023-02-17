import React from "react";

import { StyledSpinner } from "./index.styled";

type IconProps = {
  className?: string;
};

function Spinner(props: IconProps) {
  return <StyledSpinner {...props} />;
}

Spinner.displayName = "Spinner";

export { Spinner };
