import React from "react";
import RCSelect, { Option as RCOption } from "rc-select";
import clsx from "classnames";
import "./rc-styles.css";
import "./styles.css";

import { Icon } from "Icon";
import { SelectClassName, SelectDropdownClassName } from "./Select.constants";
import { Tag } from "Tag";
import { SelectOptionProps, SelectProps } from "./Select.types";

function Select(props: SelectProps) {
  const {
    children,
    className,
    dropdownClassName,
    isDisabled = false,
    isMultiSelect,
    isValid,
    maxTagCount = 2,
    maxTagPlaceholder,
    maxTagTextLength = 5,
    placeholder = "Please select",
    showSearch = false,
    size = "md",
    ...rest
  } = props;

  const getMaxTagPlaceholder = (omittedValues: any[]) => {
    return `+${omittedValues.length}`;
  };

  return (
    <RCSelect
      {...rest}
      className={clsx(SelectClassName, className)}
      clearIcon={<Icon name="close-circle-line" size="md" />}
      data-is-valid={isValid}
      data-size={size}
      disabled={isDisabled}
      dropdownClassName={clsx(
        SelectDropdownClassName,
        SelectDropdownClassName + `--${size}`,
        dropdownClassName,
      )}
      inputIcon={<Icon name="arrow-down-s-line" size="md" />}
      maxTagCount={maxTagCount}
      maxTagPlaceholder={maxTagPlaceholder || getMaxTagPlaceholder}
      maxTagTextLength={maxTagTextLength}
      menuItemSelectedIcon=""
      mode={isMultiSelect ? "multiple" : undefined}
      placeholder={placeholder}
      showArrow
      showSearch={showSearch}
      tagRender={(props) => {
        const { closable, label, onClose } = props;
        return (
          <Tag isClosable={closable} onClose={onClose}>
            {label}
          </Tag>
        );
      }}
    >
      {children}
    </RCSelect>
  );
}

Select.displayName = "Select";

Select.defaultProps = {};

// TODO: Remove warnings from here
function Option(props: SelectOptionProps) {
  return <RCOption disabled={props.isDisabled} {...props} />;
}

export { Select, Option };
