import React, { forwardRef } from "react";
import { useFocusRing } from "@react-aria/focus";
import { useTextField } from "@react-aria/textfield";
import clsx from "classnames";

import { InputProps } from "./Input.types";
import {
  Description,
  Error,
  Label,
  MainContainer,
  StyledInput,
  InputSection,
  InputContainer,
} from "./Input.styles";
import { useDOMRef } from "Hooks/useDomRef";
import { Icon } from "Icon";
import {
  InputEndIconClassName,
  InputIconClassName,
  InputStartIconClassName,
} from "./Input.constants";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      as = "input",
      description,
      endIcon,
      errorMessage,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      label,
      labelPosition = "top",
      size = "sm",
      startIcon,
      UNSAFE_height,
      UNSAFE_width,
    } = props;
    const inputRef = useDOMRef(ref);
    const { descriptionProps, errorMessageProps, inputProps, labelProps } =
      useTextField(props, inputRef);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <MainContainer component={as} labelPosition={labelPosition} size={size}>
        {/* TODO: replace this with text component */}
        {/* Issue: adding kind while implementing
        text is throwing typescript error. 
        https://stackoverflow.com/questions/68073958/cant-use-href-with-iconbuttonprops*/}
        <Label {...labelProps}>
          {label}
          {isRequired && <span>*</span>}
        </Label>
        <InputSection>
          <InputContainer disabled={isDisabled || isReadOnly}>
            {/* Start Icon Section */}
            {startIcon && as === "input" ? (
              typeof startIcon === "string" ? (
                <Icon
                  className={clsx(InputIconClassName, InputStartIconClassName)}
                  name={startIcon}
                  size={size}
                />
              ) : (
                <Icon
                  className={clsx(InputIconClassName, InputStartIconClassName)}
                  size={size}
                >
                  {startIcon}
                </Icon>
              )
            ) : null}
            {/* Input Section */}
            <StyledInput
              as={as}
              type={"text"}
              {...focusProps}
              {...inputProps}
              UNSAFE_height={UNSAFE_height}
              UNSAFE_width={UNSAFE_width}
              hasEndIcon={!!endIcon}
              hasError={!!errorMessage}
              hasStartIcon={!!startIcon}
              inputSize={size}
              isFocusVisible={isFocusVisible}
              ref={inputRef}
              renderer={as}
            />
            {/* End Icon Section */}
            {endIcon && as === "input" ? (
              typeof endIcon === "string" ? (
                <Icon
                  className={clsx(InputIconClassName, InputEndIconClassName)}
                  name={endIcon}
                  size={size}
                />
              ) : (
                <Icon
                  className={clsx(InputIconClassName, InputEndIconClassName)}
                  size={size}
                >
                  {endIcon}
                </Icon>
              )
            ) : null}
          </InputContainer>
          {description && (
            <Description
              {...descriptionProps}
              color="var(--ads-v2-color-fg-muted)"
              kind="body-s"
              style={
                isDisabled ? { opacity: "var(--ads-v2-opacity-disabled)" } : {}
              }
            >
              {description}
            </Description>
          )}
          {errorMessage && (
            <Error
              {...errorMessageProps}
              color="var(--ads-v2-color-fg-error)"
              kind="body-s"
            >
              {errorMessage}
            </Error>
          )}
        </InputSection>
      </MainContainer>
    );
  },
);

Input.displayName = "Input";

export { Input };