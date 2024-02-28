import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign } from 'hono/jwt';
import { z } from "zod";


const prisma = new PrismaClient().$extends(withAccelerate())


const user = new Hono();

const signupDto = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
});

const signinDto = z.object({
    email: z.string(),
    password: z.string(),
})

// SINGUP
user.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupDto.safeParse(body);
    if(!success){
        return c.text("Signup failed, Invalid Inputs");
    };


    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {username: body.username},
                {email: body.email}
            ]
        }
    });

    if(existingUser){
        return c.text("User with username or email already exists");
    }

    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            email: body.email
        }

    });

    return c.text("user created successfully");

});

// SINGIN
user.post('/signin', async (c) => {

    const body = await c.req.json();

    const{success} = signinDto.safeParse(body);

    if(!success){
        return c.text("Login failed, Invalid Inputs");
    }

    const user = await prisma.user.findFirst({
        where: {
            AND: [
                {email: body.email},
                {password: body.password}
            ]
        }
    });

    if(!user){
        return c.text("Login failed, Wrong Username or Password");
    }


    const token = await sign({email: body.email, userId: user.id}, "Jwt_Secret_123");

    return c.json({token: token});

})

export default user;
