import React from "react";

// TODO: This component needs an option to be controlled.
export type SegmentedControlOption = {
  /** The value of the option */
  value: string;
  /** The label of the option */
  label?: string | React.ReactNode;
  /** The icon of the option */
  startIcon?: React.ReactNode | string;
  /** The icon of the option */
  endIcon?: React.ReactNode | string;
  /** Attribute to disable the option */
  isDisabled?: boolean;
};
// SegmentedControl props
export type SegmentedControlProps = {
  /** (try not to) pass addition classes here */
  className?: string;
  /** The options of the SegmentedControl */
  options: SegmentedControlOption[];
  /** The defaultValue of the SegmentedControl */
  defaultValue?: string;
  /** The onChange of the SegmentedControl */
  onChange?: (value: string) => void;
  // TODO: We might need to rethink about this prop. For now this is required for property pane and hence added.
  /** Whether the control should consume full width of container or not */
  isFullWidth?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;
