import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const cheakUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db.user.findUnique({
            where: { clerkUserId: user.id },
        });

        if (loggedInUser) {
            // Return only serializable fields
            return {
                id: loggedInUser.id,
                name: loggedInUser.name,
                email: loggedInUser.email,
                imageUrl: loggedInUser.imageUrl,
            };
        }

        const name = `${user.firstName} ${user.lastName}`;
        const email = user.emailAddresses?.[0]?.emailAddress;

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email,
            },
        });

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            imageUrl: newUser.imageUrl,
        };
    } catch (err) {
        console.error("Error in checkUser:", JSON.stringify(err, null, 2));
        return null;
    }
};