import type { PageComponent } from "@amcoeur/types";
import { it, describe, expect, beforeEach, } from "vitest";
import { matchComponentsWithImageUrl } from "../components.js";

describe("match components with image URL", () => {
  let images: { fieldname: string; filename: string }[];
  let components: PageComponent[];

  beforeEach(() => {
    images = [];
    components = [];
  });

  it("should return an empty array if no components are provided", () => {
    const compWithImages = matchComponentsWithImageUrl(components, images);
    expect(compWithImages).toStrictEqual([]);
  });
  it("should return the components unchanged if no images are provided", () => {
    components = [
      { type: "TitleBanner" },
      { type: "TextArea" },
      { type: "Image" },
    ];
    const compWithImages = matchComponentsWithImageUrl(components, images);
    expect(compWithImages).toStrictEqual(components);
  });
  it("should return an error if no index can be extracted from image's field name", () => {
    components = [
      { type: "TitleBanner" },
      { type: "TextArea" },
      { type: "Image" },
    ];
    images = [
      { fieldname: "not a correct field name", filename: "a_filename.jpg" },
    ];
    expect(() => matchComponentsWithImageUrl(components, images)).toThrowError(
      "Cannot extract an index",
    );
  });
  it("should return an array of the initial components with their imageUrl added according to the given images", () => {
    components = [
      { type: "TitleBanner" },
      { type: "TextArea" },
      { type: "Image" },
    ];
    images = [
      { fieldname: "image for index [1]", filename: "a_filename.jpg" },
      { fieldname: "image for index [0]", filename: "b_filename.jpg" },
    ];
    const compWithImages = matchComponentsWithImageUrl(components, images);
    expect(compWithImages).toStrictEqual([
      { type: "TitleBanner", imageUrl: "/api/images/b_filename.jpg" },
      { type: "TextArea", imageUrl: "/api/images/a_filename.jpg" },
      { type: "Image" },
    ]);
  });
});
