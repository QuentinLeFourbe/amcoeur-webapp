export type PageData = {
  id?: string | number;
  name: string;
  route: string;
  components: PageComponent[];
};

export type PageComponent = TitleBannerComponent | TextAreaComponent;

export type TitleBannerComponent = {
  type: "TitleBanner";
  imageUrl: string;
  content: string;
};

export type TextAreaComponent = {
  type: "TextArea";
  content: string;
};
