import { createClient } from "redis"
import { env } from "../../config/env.service.js";

export const redisConnection = async()=>{
    const client = createClient({
    url: env.redisURI
    });

    client.on("error", function(err) {
    throw err;
    });
    await client.connect()
    console.log("Redis connected");
    return client
}

