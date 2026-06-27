import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();


router.post('/',auth(Role.ADMIN,Role.USER),postController.createPost);
router.get('/',postController.getAllPost);
router.get('/:postId',postController.getPostById);
router.get('/my-posts',auth(Role.ADMIN,Role.USER),postController.getMyPosts);
router.get('/status',auth(Role.ADMIN),postController.getPostStatus)
router.patch('/:postId',auth(Role.USER,Role.ADMIN),postController.updatePost);
router.delete('/:postId',auth(Role.USER,Role.ADMIN),postController.deletePost);


export const postRoutes = router;