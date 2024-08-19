
import {Router} from 'express'
import { uploadImage } from '../Controllers/uploadControllers'

const uploadRouter= Router()


uploadRouter.get('', uploadImage)

export default uploadRouter