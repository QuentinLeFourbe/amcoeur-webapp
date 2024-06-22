import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import NavigationBar from "./NavigationBar";

const meta: Meta<typeof NavigationBar> = { component: NavigationBar };

export default meta;

type Story = StoryObj<typeof NavigationBar>;

const NavBar = () => {
  const [links, setLinks] = useState([
    {
      label: "Navigation A",
      onClick: () => setActiveLink("Navigation A"),
      isActive: true,
    },
    {
      label: "Navigation B",
      onClick: () => setActiveLink("Navigation B"),
      isActive: false,
    },
    {
      label: "Navigation C",
      onClick: () => setActiveLink("Navigation C"),
      isActive: false,
    },
    {
      label: "Navigation D",
      onClick: () => setActiveLink("Navigation D"),
      isActive: false,
    },
  ]);

  const setActiveLink = (linkLabel: string) => {
    const newlyActivatedLinks = links.map((link) => ({ ...link, isActive: link.label === linkLabel }));
    setLinks(newlyActivatedLinks);
  };

  return <NavigationBar links={links}/>
};

export const Base: Story = {
  render: () => <NavBar/>
};
