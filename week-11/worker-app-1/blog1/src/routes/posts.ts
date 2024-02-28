import { Context, Hono } from "hono";
import { isAuth } from "../middleware";
import { z } from "zod";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

const posts = new Hono();

// GET ALL 
posts.get('/',isAuth, async (c: Context) => {
    const userId = c.get('userId');

    const posts = await prisma.post.findMany({
        where: {
            user_id: userId
        }
    });

    return c.json({ posts: posts});
});

const createPostDto = z.object({
    title: z.string(),
    description: z.string(),
})
// CREATE POST
posts.post('/',isAuth, async (c: Context) => {
    const body = await c.req.json();

    const userId = c.get("userId");

    console.log(userId);

    const {success} = createPostDto.safeParse(body);

    if(!success) {
        return c.text("Invalid Inputs");
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            description: body.description,
            user_id: userId,
        }
    });

    return c.text("Post Created");
    
});

// GET BY ID
posts.get('/:id', async (c: Context) => {
    const id = c.req.param('id');

    const post = await prisma.post.findFirst({
        where: {
            id: parseInt(id),
        }
    })

    if(!post) {
        return c.text("No Post Found");
    }

    return c.json({post: post});
});

// UPDATE BY ID
posts.put('/:id',isAuth, async (c: Context) => {

    const userId = c.get('userId');
    const id = c.req.param('id');
    const body = await c.req.json();

    const {success} = createPostDto.safeParse(body);

    if(!success){
        return c.text("Invalid Inputs");
    }

    try {
        const post = await prisma.post.update({
            where: { 
                    id: parseInt(id),
                    user_id: userId
            },
            data: {
                title: body.title,
                description: body.description
            }
        });

        if(!post)
        throw new Error(`Error updating`);

        return  c.text("Post updated successfully")

    } catch (error) {
        return c.text("Post not found or Post does not belong to User"); 
    }


});

// DELETE BY ID
posts.delete('/:id', async (c: Context) => {
    const userId = c.get('userId');
    const id = c.req.param('id');

    try {
        const post = await prisma.post.delete({
            where: {
                id: parseInt(id),
                user_id: userId
            },
            select: {
                id: true
            }
        })

        if(!post)
        throw new Error(`Error deleting`);

        return c.text("Post deleted successfully");
    } catch (error) {
        return c.text("Post does not exist or post does not belong to User");
    }
});

export default posts;