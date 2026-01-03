import { prisma } from "../lib/prisma"

const seedAdmin = async () => {
    try {
        const adminData = {
            name : "Admin1",
            email: "admin1@gmail.com",
            password: "password123456",
            role: "admin"
            // emailVerified: true
        }

        const existingAdmin = await prisma.user.findUnique({
            where : {
                email : adminData.email
            }
        })

        if(existingAdmin){
            throw new Error("Admin user already exists");
        }

        const signAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(adminData)
        })

        const updatedAdmin = await prisma.user.update({
            where : {
                email : adminData.email
            },
            data : {
                emailVerified : true
            }
        })

        console.log("Admin user created successfully:", updatedAdmin);
    } catch (error : any) {
        console.log(error);
    }
}


seedAdmin();