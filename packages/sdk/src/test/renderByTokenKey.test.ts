import { describe, it } from "vitest";
import { renderByTokenKey } from "../render-by-token-key";

describe("function renderByTokenKey", async () => {
  it("test", async () => {
    await renderByTokenKey(
      "dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4",
    );

    // 0812b194cb0a19c3ea15dc4a9d1af40acaa1a69ec9766b7770336d72b89853bb
  });
});
