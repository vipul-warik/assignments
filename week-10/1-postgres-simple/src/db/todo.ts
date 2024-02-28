import { client } from "../";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

interface Todo {
    title: string,
    description: string,
    done: boolean,
    id: number,
    user_id: number
}

export async function createTodo(userId: number, title: string, description: string): Promise<Todo> {
    try {
       // await client.connect();
        const insertQuery = `INSERT INTO todos (title, description,user_id) VALUES ($1,$2,$3)
                                RETURNING title,description,done,id`;
        const values = [title, description, userId];
        const res = await client.query(insertQuery,values);
        console.log("Inserted todo: ",res);
        return res.rows[0];
    } catch (error) {
        console.error("Error creating todo :",error);
        throw error;
    }
      finally {
       // client.end();
      }
   

}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number): Promise<Todo> {
    try {
        //await client.connect();
        const updatetQuery = `UPDATE todos SET done = true WHERE id = $1
                                RETURNING title,description,done,id`;
        const values = [todoId];
        const res = await client.query(updatetQuery,values);
        console.log("Updated todo: ",res);
        return res.rows[0];
    } catch (error) {
        console.error("Error updating todo: ",error);
        throw error;
    }
     finally{
        //client.end();
     }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number): Promise<Todo[]> {
    try {
        //await client.connect();
        const selectQuery =   `SELECT * FROM todos WHERE user_id=$1`;
        const values = [userId];
        const res = await client.query(selectQuery,values);
        console.log("todos fetched: ",res);
        return res.rows;
    } catch (error) {
        console.error("Error occured while fetchiing todos: ",error);
        throw error;
    }
     finally{
        //client.end();
     }
}