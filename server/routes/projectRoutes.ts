import express from 'express';
import { protect } from '../middlewares/auth';
import { deleteProject, getProjectById, getProjectPreview, getPublishedProjects, makeRevisions, rollbackToVersion, saveProjectCode } from '../controllers/projectController';
import { togglePublish } from '../controllers/userController';

const projectRouter = express.Router();

projectRouter.post('/revision/:projectId',protect, makeRevisions)
projectRouter.put('/save/:projectId',protect, saveProjectCode)
projectRouter.get('/rollback/:projectId/:versionId',protect, rollbackToVersion)
projectRouter.delete('/:projectId',protect, deleteProject)
projectRouter.get('/preview/:projectId',protect, getProjectPreview)
projectRouter.get('/published', getPublishedProjects)
projectRouter.get('/published/:projectId', getProjectById)
projectRouter.put('/publish-toggle/:projectId',protect, togglePublish)

export default projectRouter