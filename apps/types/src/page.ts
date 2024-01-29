export type PageData = {
  _id?: string;
  name: string;
  route: string;
  components: PageComponent[];
};

export type PageComponent =
  | TitleBannerComponent
  | TextAreaComponent
  | SectionPanelComponent;

export type TitleBannerComponent = {
  type: "TitleBanner";
  title: string;
  imageUrl: string;
  content: string;
};

export type TextAreaComponent = {
  type: "TextArea";
  content: string;
};

export type SectionPanelComponent = {
  type: "SectionPanel";
  imageUrl: string;
  title: string;
  content: string;
  link: string;
  linkLabel: string;
};

export type HeaderPrimaryLink = {
  id?: string | number;
  label: string;
  link: string;
};
