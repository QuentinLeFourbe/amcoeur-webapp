import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import ListInput from "./ListInput";

const meta: Meta<typeof ListInput> = {
  component: ListInput,
};

export default meta;

type Story = StoryObj<typeof ListInput>;

type ControlledInputProps = {
  defaultValues?: string[];
  label?: string;
};
const ControlledListInput = ({
  defaultValues = [],
  label,
}: ControlledInputProps) => {
  const [values, setValues] = useState(defaultValues);

  return (
    <ListInput
      value={values}
      onChange={(newValues) => setValues(newValues)}
      label={label}
      name="mes-champs"
    />
  );
};

export const Base: Story = {
  render: () => <ControlledListInput label="Mes champs"/>
};
