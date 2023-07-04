/**
 * @jest-environment node
 */
import { createRequest } from "node-mocks-http";
import openAI from "@/lib/openAI";
import { POST } from "./route";

describe("generate image API", () => {
  test("empty string should return is required error", async () => {
    const req = createRequest({
      json: jest.fn().mockResolvedValue({ prompt: "" }),
    });

    const result = await POST(req);
    const jsonResult = await result.json();

    expect(jsonResult).toEqual({ error: "Prompt is required" });
  });

  test("white spaces should also return is required error", async () => {
    const req = createRequest({
      json: jest.fn().mockResolvedValue({ prompt: "   " }),
    });

    const result = await POST(req);
    const jsonResult = await result.json();

    expect(jsonResult).toEqual({ error: "Prompt is required" });
  });

  test("should return length error", async () => {
    const req = createRequest({
      json: jest.fn().mockResolvedValue({
        prompt:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      }),
    });

    const result = await POST(req);
    const jsonResult = await result.json();

    expect(jsonResult).toEqual({ error: "Must be 50 characters or less" });
  });

  test("should return url of generated", async () => {
    const generateImageUrl =
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NlQtpNLLSAUCOL8uoZF6rvFa/user-QpjWJPPLK0tLsZHT6JWjL0YY/img-y70azySQX4VIhZbRMewwsQAO.png?st=2023-06-27T12%3A17%3A05Z&se=2023-06-27T14%3A17%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-27T00%3A07%3A35Z&ske=2023-06-28T00%3A07%3A35Z&sks=b&skv=2021-08-06&sig=JxYTIm9ZwwhRBdYZfNOR5PaTHzMBcMsVJ1161MTZr/c%3D";
    const req = createRequest({
      json: jest.fn().mockResolvedValue({ prompt: "the beatles" }),
    });

    openAI.createImage = jest.fn().mockReturnValue({
      data: {
        data: [
          {
            url: generateImageUrl,
          },
        ],
      },
    });

    const result = await POST(req);
    const jsonResult = await result.json();

    expect(jsonResult).toEqual({
      url: generateImageUrl,
    });
  });
});
