import app from "./app";
import { prisma } from "./lib/prisma";

const PORT  = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log('server is connected');

        app.listen(PORT,() => {
            console.log('server is running on',PORT);
        })
    } catch (error : any) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();