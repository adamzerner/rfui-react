import * as React from "react";
import { ReactNode } from "react";
import { RadioButton, RadioButtonType } from "../atoms/radio-button";
import { Flex } from "../helpers/flex";
import { Stack } from "../helpers/stack";

export type RadioButtonCardGroupType = {
  padding?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg";
  children: ReactNode;
};

export type RadioButtonCardGroupItemType = {
  name: string;
  value?: RadioButtonType["value"];
  selectedItemName: Signal<string | null>;
  radioButtonRest?: Omit<RadioButtonType, "size" | "name" | "value">;
  children: ReactNode;
};

/** *
 * @function RadioButtonCardGroup
 *
 * @see {@link https://rfui.deno.dev/molecules/radio-button-card-group}
 *
 * @example
 * <RadioButtonCardGroup>
 *   <RadioButtonCardGroupItem name="one" selectedItemName={selectedItemName}>
 *     One
 *   </RadioButtonCardGroupItem>
 *    <RadioButtonCardGroupItem name="two" selectedItemName={selectedItemName}>
 *     Two
 *   </RadioButtonCardGroupItem>
 *    <RadioButtonCardGroupItem name="three" selectedItemName={selectedItemName}>
 *     Three
 *   </RadioButtonCardGroupItem>
 * </RadioButtonCardGroup>
 */
export const RadioButtonCardGroup = ({
  padding = "md",
  rounded,
  children,
}: RadioButtonCardGroupType) => {
  const id = crypto.randomUUID();
  let containerClass = `radio-button-card-group-${id}`;

  containerClass += ` gap-${padding === "sm" ? 2 : padding === "md" ? 3 : 4}`;

  return (
    <>
      <style>
        {`
        .radio-button-card-group-${id} .radio-button-card-group-item {
          padding: var(--spacing-${
            padding === "sm" ? 3 : padding === "md" ? 5 : 7
          });
          border-radius: var(${
            rounded === "square"
              ? "--spacing-0"
              : rounded === "sm"
                ? "--spacing-1"
                : rounded === "lg"
                  ? "--spacing-2"
                  : "--default-roundedness"
          });
        }

        .radio-button-card-group-${id} .rfui-radio-button {
          width: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
          height: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
        }

        .radio-button-card-group-${id} .radio-button-card-group-item {
          gap: var(--spacing-${
            padding === "sm" ? 3 : padding === "md" ? 4 : 5
          });
        }
      `}
      </style>
      <Stack className={containerClass}>{children}</Stack>
    </>
  );
};

export const RadioButtonCardGroupItem = ({
  name,
  value,
  selectedItemName,
  radioButtonRest,
  children,
}: RadioButtonCardGroupItemType) => {
  const isSelected = name === selectedItemName.value;
  const handleClick = () => {
    selectedItemName.value = name;
  };
  let containerClass =
    "radio-button-card-group-item border items-center cursor-pointer";

  containerClass += isSelected
    ? " border-2 border-neutral-500"
    : " border-2 border-neutral-100";

  return (
    <Flex className={containerClass} onClick={handleClick}>
      <RadioButton
        name={name}
        checked={isSelected}
        value={value}
        {...radioButtonRest}
      />
      <div>{children}</div>
    </Flex>
  );
};
