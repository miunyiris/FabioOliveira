import express from 'express';
import {
    createResource,
    listResources,
    getResource,
    updateResource,
    deleteResource,
} from '../controllers/resourceController';

const router = express.Router();

router.post('/', createResource);  // POST /api/resources
router.get('/', listResources);    // GET /api/resources
router.get('/:id', getResource);   // GET /api/resources/:id
router.put('/:id', updateResource); // PUT /api/resources/:id
router.delete('/:id', deleteResource); // DELETE /api/resources/:id
export default router;