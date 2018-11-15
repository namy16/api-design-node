import express from 'express';
let router = express.Router();
import depRoutes from './deployment/depRoutes'
import agentRoutes from './agents/agentRoutes'

// api router will mount other routers
// for all our resources
router.use('/deployments', depRoutes);
router.use('/agents', agentRoutes);

export default router;
