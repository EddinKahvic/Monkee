import AmICool from './interactions/amicool'
import { addInteractions, startClient } from './config/client.config'

addInteractions([AmICool])

startClient()
