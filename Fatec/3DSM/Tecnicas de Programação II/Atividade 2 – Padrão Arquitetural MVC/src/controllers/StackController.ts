import { Request, Response } from "express";
import { stack } from "../models/instances";
import { StackView } from "../views/stackView";

export class StackController {
  public add(req: Request, res: Response): void {
    const result = stack.tryAddItem(req.body.item);

    if (!result.ok) {
      StackView.addValidationError(res, result.error);
      return;
    }

    StackView.itemAdded(res);
  }

  public remove(_req: Request, res: Response): void {
    const removed = stack.remove();

    if (removed === undefined) {
      StackView.emptyStructure(res);
      return;
    }

    StackView.removed(res, removed);
  }

  public peek(_req: Request, res: Response): void {
    const top = stack.peek();

    if (top === undefined) {
      StackView.emptyStructure(res);
      return;
    }

    StackView.peek(res, top);
  }

  public getAll(_req: Request, res: Response): void {
    StackView.listAll(res, stack);
  }

  public clear(_req: Request, res: Response): void {
    stack.clear();
    StackView.cleared(res);
  }
}
