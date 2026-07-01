import { prisma } from "../../lib/prisma"
import { ICommentPayload, IUpdateCommentPayload } from "./comment.interface"

const createComment = async(authorId:string,payload:ICommentPayload)=>{
    const post = await prisma.post.findUniqueOrThrow({where:{id:payload.postId}});

    const result = await prisma.comment.create({
        data:{
            ...payload,
            authorId
        }
    })

    return result;
}

const getCommentById = async(commentId:string)=>{
    const result = await prisma.comment.findUniqueOrThrow({where:{id:commentId}});
    return result;
}

const getCommentByAuthorId = async(authorId:string)=>{
    const result = await prisma.comment.findMany({
        where:{
            authorId
        }
    })
    return result;
}

const updateCommentById = async(authorId:string,isAdmin:boolean,commentId:string,payload:IUpdateCommentPayload)=>{

    const comment = await prisma.comment.findUniqueOrThrow({
        where:{id:commentId}
    })

    if(comment.authorId !== authorId && !isAdmin){
        throw new Error("You Can't update is comment");
    }

    const result = await prisma.comment.update({
        where:{
            id:commentId
        },
        data:{
            ...payload
        }
    })

    return result;

}

const deletedComment = async(authorId:string,isAdmin:boolean,commentId:string)=>{
    const comment = await prisma.comment.findUniqueOrThrow({
        where:{
            id:commentId,
        }
    })

    if(comment.authorId !== authorId && !isAdmin){
        throw new Error("You Can't delete this comment");
    }

    const result = await prisma.comment.delete({
        where:{
            id:commentId
        }
    })

    return result;

}


export const commentService = {
    createComment,
    getCommentById,
    getCommentByAuthorId,
    updateCommentById,
    deletedComment
}