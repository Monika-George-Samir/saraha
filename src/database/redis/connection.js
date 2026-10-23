import { createClient } from "redis"

export const redisConnection = async()=>{
    const client = createClient({
    url: "rediss://default:gQAAAAAAA5jaAAIgcDE1MTU3MDA3YTc2ODk0NzJlOTZmOTc0NzA4NjYxNDY3Nw@learning-malamute-235738.upstash.io:6379"
    });

    client.on("error", function(err) {
    throw err;
    });
    await client.connect()
    console.log("Redis connected");
    return client
}
