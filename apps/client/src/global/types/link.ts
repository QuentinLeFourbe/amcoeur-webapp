export type Link = {
  name: string;
  href: string;
};

export type LinkGroup = {
  name: string;
  src: string;
  subLinks?: Link[];
};
