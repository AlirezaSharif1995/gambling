import { Router, Request, Response } from 'express';
const router = Router();
const contryAccessKey = ""

router.post('/', async (req: Request, res: Response) => {
    try {
        res.json(200).json({success: true, message: "configs received", countryAccessKey: "Asdasd"})
     
    } catch (error) {
      console.error('Error registering player:', error);
      res.status(500).json({ success: false, message: 'Error registering player', error: error });
    }
  });

  export default router; 
  