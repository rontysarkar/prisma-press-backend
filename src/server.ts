import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = 5000;

async function main(){
    try {
        await prisma.$connect();
        console.log("Prisma client connect")
        app.listen(PORT,()=>{
            console.log(`Server is Running on Port ${PORT}`)
        })
    } catch (error) {
        console.log("Error starting the server : ",error);
        await prisma.$disconnect();
        process.exit(1);
    }
}


main();