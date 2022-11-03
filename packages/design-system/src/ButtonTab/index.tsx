import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ControlIcons } from "ControlIcons";
import _ from "lodash";
import { DSEventTypes } from "Types/common";
import { useDSEvent } from "hooks";

const ItemWrapper = styled.div<{ selected: boolean }>`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ads-border-radius);
  color: var(--ads-color-text);
  border: 1px solid
    ${(props) =>
      props.selected ? "var(--ads-color-gray-400)" : "var(--ads-color-border)"};

  &:hover {
    border-color: var(--ads-color-border-hover);
    background: var(--ads-color-brand-secondary-hover);
  }

  &.focused,
  &[aria-selected="true"] {
    border-color: var(--ads-color-gray-400);
    background: var(--ads-color-gray-100);
    color: var(--ads-color-text-active);
    && svg {
      path {
        fill: var(--ads-color-text-active);
      }
    }
  }

  cursor: pointer;
  &:not(:last-child) {
    margin-right: 4px;
  }
  & > div {
    cursor: pointer;
  }
  &&& svg {
    path {
      fill: var(--ads-color-text);
    }
  }
`;

const FlexWrapper = styled.div<{ fullWidth: boolean }>`
  display: flex;
  ${ItemWrapper} {
    flex: ${({ fullWidth }) => (fullWidth ? 1 : "none")};
  }
`;

export interface ButtonTabOption {
  icon?: string | JSX.Element;
  label?: string;
  value: string;
  width?: number;
}

interface ButtonTabComponentProps {
  fullWidth?: boolean;
  options: ButtonTabOption[];
  values: Array<string>;
  selectButton: (value: string, isUpdatedViaKeyboard: boolean) => void;
}

// eslint-disable-next-line react/display-name
const ButtonTabComponent = React.forwardRef(
  (props: ButtonTabComponentProps, ref: any) => {
    const { options, selectButton, values } = props;
    const valueSet = new Set(values);
    let firstValueIndex = 0;
    for (const [i, x] of options.entries()) {
      if (valueSet.has(x.value)) {
        firstValueIndex = i;
        break;
      }
    }

    const { emitDSEvent, eventEmitterRef } = useDSEvent<HTMLDivElement>(
      false,
      ref,
    );

    const emitKeyPressEvent = useCallback(
      (key: string) => {
        emitDSEvent({
          component: "ButtonTab",
          event: DSEventTypes.KEYPRESS,
          meta: {
            key,
          },
        });
      },
      [emitDSEvent],
    );

    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "Right":
          emitKeyPressEvent(e.key);
          setFocusedIndex((prev) =>
            prev === options.length - 1 ? 0 : prev + 1,
          );
          break;
        case "ArrowLeft":
        case "Left":
          emitKeyPressEvent(e.key);
          setFocusedIndex((prev) =>
            prev === 0 ? options.length - 1 : prev - 1,
          );
          break;
        case "Enter":
        case " ":
          emitKeyPressEvent(e.key);
          selectButton(options[focusedIndex].value, true);
          e.preventDefault();
          break;
        case "Tab":
          emitKeyPressEvent(`${e.shiftKey ? "Shift+" : ""}${e.key}`);
          break;
      }
    };

    return (
      <FlexWrapper
        className="ads--button-tab"
        fullWidth={props.fullWidth ?? false}
        onBlur={() => setFocusedIndex(-1)}
        onFocus={() => setFocusedIndex(firstValueIndex)}
        onKeyDown={handleKeyDown}
        ref={eventEmitterRef}
        role="tablist"
        tabIndex={0}
      >
        {options.map(
          (
            { icon, label, value, width = 24 }: ButtonTabOption,
            index: number,
          ) => {
            let ControlIcon;
            if (_.isString(icon)) {
              const Icon = ControlIcons[icon];
              ControlIcon = <Icon height={24} width={width} />;
            } else {
              ControlIcon = icon;
            }
            const isSelected = valueSet.has(value);
            return (
              <ItemWrapper
                aria-selected={isSelected}
                className={`t--button-tab-${value} ${
                  index === focusedIndex ? "focused" : ""
                }`}
                key={index}
                onClick={() => {
                  selectButton(value, false);
                  setFocusedIndex(index);
                }}
                role="tab"
                selected={isSelected}
              >
                {ControlIcon} {label}
              </ItemWrapper>
            );
          },
        )}
      </FlexWrapper>
    );
  },
);

export default ButtonTabComponent;
