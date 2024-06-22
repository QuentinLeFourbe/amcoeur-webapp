import type { Meta, StoryObj } from "@storybook/react";

import Link from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Base: Story = {
  args: {
    children: "Hello",
    variant: "primary",
  },
};

