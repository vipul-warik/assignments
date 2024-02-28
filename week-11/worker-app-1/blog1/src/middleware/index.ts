import { Context } from 'hono';
import { verify } from 'hono/jwt';


export async function isAuth(c:Context, next:Function) {
    const authorization = c.req.header('authorization');

    if(!authorization) {
        return c.text("Invalid Authorization");
    }

    const token = authorization.split(' ')[1];


    const decode = await verify(token, "Jwt_Secret_123");

    if(!decode){
        c.text("Authorization failed");
    }



    c.set("userId", decode.userId);

    await next();
}