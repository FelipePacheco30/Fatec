import { Request, Response } from "express";
import { ListStructure } from "../models/ListStructure";
import { list } from "../models/instances";
import { ListView } from "../views/listView";

export class ListController {
  public add(req: Request, res: Response): void {
    const result = list.tryAddItem(req.body.item);

    if (!result.ok) {
      ListView.addValidationError(res, result.error);
      return;
    }

    ListView.itemAdded(res);
  }

  public remove(_req: Request, res: Response): void {
    const removed = list.remove();

    if (removed === undefined) {
      ListView.emptyStructure(res);
      return;
    }

    ListView.removed(res, removed);
  }

  public removeAt(req: Request, res: Response): void {
    const index = ListStructure.parseIndex(req.params.index);

    if (index === undefined) {
      ListView.invalidIndexParam(res);
      return;
    }

    const removed = list.removeAt(index);

    if (removed === undefined) {
      ListView.invalidRemoveIndex(res);
      return;
    }

    ListView.removedAt(res, removed, index);
  }

  public getAt(req: Request, res: Response): void {
    const index = ListStructure.parseIndex(req.params.index);

    if (index === undefined) {
      ListView.invalidIndexParam(res);
      return;
    }

    const item = list.getAt(index);

    if (item === undefined) {
      ListView.invalidGetIndex(res);
      return;
    }

    ListView.itemAt(res, index, item);
  }

  public peek(_req: Request, res: Response): void {
    const last = list.peek();

    if (last === undefined) {
      ListView.emptyStructure(res);
      return;
    }

    ListView.peek(res, last);
  }

  public getAll(_req: Request, res: Response): void {
    ListView.listAll(res, list);
  }

  public clear(_req: Request, res: Response): void {
    list.clear();
    ListView.cleared(res);
  }
}
