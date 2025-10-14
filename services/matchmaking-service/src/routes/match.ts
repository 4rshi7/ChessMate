import { Router} from "express";
import { enterMatchmakingQueue } from "../controllers/match";

const router: Router = Router();

router.get('/join', enterMatchmakingQueue);

export default router;