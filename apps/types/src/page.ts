export type PageData = {
  id?: string | number;
  name: string;
  route: string;
  components: PageComponent[];
};

export type PageComponent = TitleBannerComponent | TextAreaComponent;

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

export type HomeSection = {
  id?: string | number;
  imageUrl: string;
  content: string;
  link: string;
  linkLabel: string;
};

export type HeaderPrimaryLink = {
  id?: string | number;
  label: string;
  link: string;
};
