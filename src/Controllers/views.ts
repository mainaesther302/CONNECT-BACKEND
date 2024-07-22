import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config/Index';
import mssql from 'mssql';
import { ViewRequest, View } from '../Models/views';
import { DbHelper } from '../Database Helpers/index';
import { ViewSchema } from '../Helpers/views';

// *******************************ADD Views****************************
const dbInstance = new DbHelper()
export const AddView: RequestHandler = async (req: ViewRequest, res: Response) => {
  try {
    const ViewId = uuid();
    const { UserId, Image, Description } = req.body;

    // Validate request body
    const { error } = ViewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Log request data for debugging purposes

    console.log(req.body)

    // Execute stored procedure to add a view
    await dbInstance.exec("addView", { ViewId, UserId, Image, Description });
    res.status(201).json({ message: 'View added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  console.log(req.body)

};
// *******************************GET ALL Views****************************

export const GetViews: RequestHandler = async (req,res) => {


  try {
    const views = (await dbInstance.exec("getAllViews", {})).recordset as View[]
    console.log(views)

    if (views.length > 0) {
      console.log(views)
      return res.status(200).json(views);
    }

    return res.status(404).json({ message: 'No views found' });

  } catch (error: any) {
    return res.status(500).json({ error: error.Message });
  }
};

// *******************************GET VIEW****************************
export const GetView: RequestHandler = async (req, res) => {
  try {
    const view = (await dbInstance.exec("getView", { ViewId: req.params.Id })).recordset[0] as View
    if (view) {
      return res.status(200).json(view);
    }
    else {
      return res.status(404).json({ message: 'view not found' })
    }

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong " + error });

  }

}



// ********************UPDATE HOTEL**********************************
export const UpdateView = async (req: Request<{ id: string }>, res: Response) => {
  try {

    const { error } = ViewSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })

    }

    const View = (await dbInstance.exec("getView", { ViewId: req.params.id })).recordset[0] as View
    console.log(View);

    if (View && View.ViewId) {
      const { Image, Description } = req.body
      await dbInstance.exec("updateView", { ViewId: req.params.id, Image, Description })
      return res.status(200).json({ message: "View updated successfully" })

    }


  }

  catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// *******************************DELETE HOTEL****************************

export const DeleteView: RequestHandler = async (req: Request, res: Response) => {
  try {
    const View = (await dbInstance.exec("getView", { ViewId: req.params.Id })).recordset[0] as View
    if (View && View.ViewId) {
      await dbInstance.exec("deleteView", { Id: req.params.Id })

      res.status(200).json({ message: 'View deleted successfully' });
    } else {
      res.status(404).json({ message: 'View not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}