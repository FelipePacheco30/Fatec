import { Request, Response } from "express";
import { queue } from "../models/instances";
import { QueueView } from "../views/queueView";

export class QueueController {
  public add(req: Request, res: Response): void {
    const result = queue.tryAddItem(req.body.item);

    if (!result.ok) {
      QueueView.addValidationError(res, result.error);
      return;
    }

    QueueView.itemAdded(res);
  }

  public remove(_req: Request, res: Response): void {
    const removed = queue.remove();

    if (removed === undefined) {
      QueueView.emptyStructure(res);
      return;
    }

    QueueView.removed(res, removed);
  }

  public peek(_req: Request, res: Response): void {
    const front = queue.peek();

    if (front === undefined) {
      QueueView.emptyStructure(res);
      return;
    }

    QueueView.peek(res, front);
  }

  public getAll(_req: Request, res: Response): void {
    QueueView.listAll(res, queue);
  }

  public clear(_req: Request, res: Response): void {
    queue.clear();
    QueueView.cleared(res);
  }
}
