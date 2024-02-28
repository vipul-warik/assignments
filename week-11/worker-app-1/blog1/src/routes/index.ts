import { Hono } from "hono";
import user from "./users";
import posts from "./posts";


const root = new Hono();

root.route('/users',user);
root.route('/posts',posts);

export default root;