import {Router} from 'express'
import { addFruits, getFruits } from '../Controllers/fruitController'

const fruitsRouter= Router()


fruitsRouter.get("", getFruits)
fruitsRouter.post("", addFruits)

export default fruitsRouter