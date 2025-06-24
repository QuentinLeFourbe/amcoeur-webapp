import axios from "axios";
import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { checkRecaptcha } from "../captcha.js";

vi.mock("axios");

describe("check recaptcha middleware", () => {
  let mockedRequest: Partial<Request>;
  let mockedResponse: Partial<Response>;
  let nextFunction: Partial<NextFunction>;

  beforeEach(() => {
    mockedRequest = {};
    mockedResponse = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      status: vi.fn((_code: number) => mockedResponse as Response),
      json: vi.fn(),
    };
    nextFunction = vi.fn();
  });

  describe("without CAPTCHA_SERVER_KEY", () => {
    beforeEach(() => {
      vi.unstubAllEnvs();
    });

    it("should return a 500 error if no secret key is setup as env variable", () => {
      checkRecaptcha(
        mockedRequest as Request,
        mockedResponse as Response,
        nextFunction as NextFunction,
      );
      expect(mockedResponse.status).toHaveBeenCalledWith(500);
      expect(mockedResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Missing reCaptcha secret key configuration.",
      });
    });
  });

  describe("with CAPTCHA_SERVER_KEY", () => {
    beforeEach(() => {
      vi.stubEnv("CAPTCHA_SERVER_KEY", "secret key");
    });

    it("should return a 400 error if token is not provided", () => {
      mockedRequest = {
        body: {},
      };
      checkRecaptcha(
        mockedRequest as Request,
        mockedResponse as Response,
        nextFunction as NextFunction,
      );
      expect(mockedResponse.status).toHaveBeenCalledWith(400);
      expect(mockedResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Missing reCAPTCHA token.",
      });
    });

    it("should call the next method if the token is valid", async () => {
      mockedRequest = {
        body: { token: "valid token" },
      };
      vi.mocked(axios, true).post.mockResolvedValue({
        data: { success: true },
      });
      await checkRecaptcha(
        mockedRequest as Request,
        mockedResponse as Response,
        nextFunction as NextFunction,
      );
      expect(nextFunction).toHaveBeenCalled();
    });
    it("should return a 400 error if the token is not valid", async () => {
      mockedRequest = {
        body: { token: "valid token" },
      };
      vi.mocked(axios, true).post.mockResolvedValue({
        data: { success: false },
      });
      await checkRecaptcha(
        mockedRequest as Request,
        mockedResponse as Response,
        nextFunction as NextFunction,
      );
      expect(nextFunction).not.toHaveBeenCalled();
      expect(mockedResponse.status).toHaveBeenCalledWith(400);
      expect(mockedResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to validate reCAPTCHA token.",
      });
    });
  });
});
