import express from "express"
import { getHistMoment, postHistMoment, deleteHistory, updateHistory, getHistMomentOne } from "../controlers/historycontrolers.js"

const router = express.Router()

router.get("/", getHistMoment)
router.post("/", postHistMoment)
router.get("/:id", getHistMomentOne)
router.delete("/:id", deleteHistory)
router.put("/:id", updateHistory)


export default router