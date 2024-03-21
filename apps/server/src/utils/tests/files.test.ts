import { it, describe, expect, beforeEach, vi } from "vitest";
import {
  deleteOldImages,
  deletePageImages,
  deleteUploadedImage,
} from "../files.js";
import fs from "fs";
import type { PageDataServer } from "@amcoeur/types";

vi.mock("fs", async (importOriginal) => {
  const mod = await importOriginal<typeof import("fs")>();
  return {
    ...mod,
    default: { ...mod, existsSync: vi.fn(() => true), unlinkSync: vi.fn() },
  };
});

describe("delete uploaded image", () => {
  it("should throw an error if no imageUrl is provided", async () => {
    const imageUrl = "";
    await expect(deleteUploadedImage(imageUrl)).rejects.toThrowError(
      "Missing param imageUrl",
    );
  });
  it("should throw an error if the image is not found in the upload folder", async () => {
    const imageUrl = "anImageUrl.jpg";
    vi.mocked(fs.existsSync).mockReturnValueOnce(false);
    await expect(deleteUploadedImage(imageUrl)).rejects.toThrowError(
      "Image to delete does not exist",
    );
  });
  it("should call fs.unlinkSync if the image is found in the upload folder", async () => {
    const imageUrl = "anImageUrl.jpg";
    vi.mocked(fs.existsSync).mockReturnValueOnce(true);
    await deleteUploadedImage(imageUrl);
    expect(fs.unlinkSync).toHaveBeenCalled();
  });
});

describe("delete page' images", () => {
  const page: PageDataServer = {
    name: "My page",
    route: "my-route",
    components: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not call the unlinkSync if the page contains no components with images", () => {
    deletePageImages(page);
    page.components = [{ type: "TextArea", content: "My content" }];
    deletePageImages(page);
    expect(fs.unlinkSync).not.toHaveBeenCalled();
  });

  it("should call the unlinkSync method for a number of time equal to the number of components with an image", async () => {
    page.components = [
      { type: "TextArea", content: "My content" },
      {
        type: "ContentPanel",
        title: "Content test title",
        imageUrl: "anImageUrl.jpg",
      },
      { type: "Image", imageUrl: "anotherimageUrl.png" },
    ];
    deletePageImages(page);
    expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
  });
});

describe("delete old images", () => {
  const newPage: PageDataServer = {
    name: "My page",
    route: "my-route",
    components: [],
  };
  const oldPage: PageDataServer = {
    name: "My page",
    route: "my-route",
    components: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should do return nothing of either the oldPage is undefined or the newpage is undefined", () => {
    expect(deleteOldImages(undefined, undefined)).toBeUndefined();
  });

  it("should not call the unlinkSync method if all images' urls match between the old and new page", () => {
    newPage.components = [
      { type: "TitleBanner", imageUrl: "titleImage" },
      { type: "Image", imageUrl: "imageUrl" },
    ];

    oldPage.components = [
      { type: "TitleBanner", imageUrl: "titleImage" },
      { type: "Image", imageUrl: "imageUrl" },
    ];
    deleteOldImages(oldPage, newPage);
    expect(fs.unlinkSync).not.toHaveBeenCalled();
  });

  it("should call the unlinkSync method times the number of matching imageUrl in the components", () => {

    newPage.components = [
      { type: "TitleBanner", imageUrl: "titleImage" },
      { type: "Image", imageUrl: "imageUrl" },
    ];

    oldPage.components = [
      { type: "TitleBanner", imageUrl: "titleImage" },
      { type: "Image", imageUrl: "imageUrl" },
      { type: "Image", imageUrl: "anOtherUrl" },
      { type: "Image", imageUrl: "totoImage" },
    ];
    deleteOldImages(oldPage, newPage);
    expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
  })

});
