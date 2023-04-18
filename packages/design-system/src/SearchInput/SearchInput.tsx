import React, { useState } from "react";
import clsx from "classnames";

import { SearchInputProps } from "./SearchInput.types";
import { StyledSearchInput } from "./SearchInput.styles";
import { SearchInputClassName } from "./SearchInput.constants";

function SearchInput(props: SearchInputProps) {
  const { className, onChange, placeholder, size = "sm", ...rest } = props;
  const [value, setValue] = useState<string>(props.value || "");

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <StyledSearchInput
      {...rest}
      className={clsx(SearchInputClassName, className)}
      endIcon={value ? "close-circle-line" : undefined}
      endIconProps={{ onClick: () => handleChange("") }}
      onChange={handleChange}
      placeholder={placeholder || "Search"}
      renderAs="input"
      size={size}
      startIcon="search-line"
      value={value}
    />
  );
}

SearchInput.displayName = "SearchInput";

export { SearchInput };
