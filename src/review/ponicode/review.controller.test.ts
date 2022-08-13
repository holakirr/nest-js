import * as review_controller from "../review.controller";
// @ponicode
describe("review_controller.ReviewController.create", () => {
  let inst: any;

  beforeEach(() => {
    inst = new review_controller.ReviewController();
  });

  test("0", async () => {
    await inst.create({});
  });
});
