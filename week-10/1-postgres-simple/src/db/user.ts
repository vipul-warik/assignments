import { client } from "../";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
interface User {
    username: string,
    password: string,
    name: string,
    id?: number
};
export async function createUser(username: string, password: string, name: string): Promise<User> {
    try {
      // await client.connect();
    const insertQuery = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3)
                            RETURNING username,password,name`;
    const values = [username, password, name];
    const res = await client.query(insertQuery,values);
    console.log("Insertion successful: ",res);
    return res.rows[0];
    } catch (error) {
        console.error("Error during insertion :",error);
        throw error;
    }
     finally {
       //await client.end();
     }
    

}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number): Promise<User> {
    try {
       // await client.connect();
    const selectQuery = `SELECT * FROM users WHERE id = $1`
    const values = [userId];
    const res = await client.query(selectQuery,values);
    console.log("User retrieved");
    return res.rows[0];  
    } catch (error) {
        console.error("Error during retrieve :",error);
        throw error;
    }
    finally {
      //  client.end();
    }
    
}
