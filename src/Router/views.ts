import {Router} from 'express';
import { AddView,GetViews,GetView,UpdateView,DeleteView } from '../Controllers/views';
import { authorize } from '../MiddleWare';

const viewRoutes = Router()

viewRoutes.post("",authorize, AddView)
viewRoutes.get("/allviews", GetViews)
viewRoutes.get(":/ViewId", GetView)
viewRoutes.delete("/:ViewId", DeleteView)

viewRoutes.put("/:ViewId", UpdateView)




export default viewRoutes;