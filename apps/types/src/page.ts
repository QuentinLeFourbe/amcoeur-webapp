export type PageData = {
  _id?: string;
  name: string;
  route: string;
  components: PageComponent[];
};

export type PageComponent = PageComponentWithImage | TextAreaComponent;

export type PageComponentWithImage =
  | TitleBannerComponent
  | SectionPanelComponent;

export type TitleBannerComponent = {
  type: "TitleBanner";
  title: string;
  imageUrl: string;
  image: File | null | undefined;
  content: string;
};

export type TextAreaComponent = {
  type: "TextArea";
  content: string;
};

export type SectionPanelComponent = {
  type: "SectionPanel";
  imageUrl: string;
  image: File | null | undefined;
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
