import { createClient } from "redis"

export const redisConnection = async()=>{
    const client = createClient({
    url: "rediss://default:gQAAAAAAAucvAAIgcDIwMGNiYjU4NmExMjA0YjYxOGY5N2Q0ZWY3ZDNjNjNjMQ@light-monarch-190255.upstash.io:6379"
    });

    client.on("error", function(err) {
    throw err;
    });
    await client.connect()
    console.log("Redis connected");
    return client
}

