import { prisma } from "../../lib/prisma"

const getAllUsers = async() => {
    const users = await prisma.user.findMany({
        where : {
            OR : [
                {
                    email : {
                        endsWith: "gmail.com"
                    },
                    
                },
                {
                    email : {
                        endsWith : "yahoo.com"
                    }
                }
            ],
            NOT : {
                email : {
                    endsWith : "example.com"
                }
            }
        },
        
    })

    return users;
}

export const UserServices = {
    getAllUsers
}