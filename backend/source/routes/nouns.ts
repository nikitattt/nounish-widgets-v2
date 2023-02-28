import express from 'express'
import nounsController from '../controllers/nouns'
import lilNounsController from '../controllers/lilnouns'

const router = express.Router()

router.get('/nouns', nounsController.getNounsData)
router.get('/lil-nouns', lilNounsController.getLilNounsData)

export = router
