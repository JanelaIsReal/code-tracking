import { clerkClient } from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
        res.status(401).json({message: "Unauthorized"});
        return
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isadmin = process.env.ADMIN_EMAILS === currentUser.email.primaryEmailAddress.emailAddress;
        if(!isadmin){
            return res.status(401).json({message: "Unauthorized"});
        }

        next();
    } catch (error) {
        console.log("Error in auth middleware");
        next(error)
    }
}