import express from 'express';

import "dotenv/config";
import cors from "cors";
import router from './src/routes/index.js'

const app = express();
app.use(cors());
app.use(express.json())
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;