import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const userData = await req.json();
        console.log("Body: ", userData)

        const userExists = await User.findOne({email: userData.email })
                            .lean()
                            .exec();

        if(userExists) {
            return NextResponse.json({message: "User Exists"}, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(userData.password, 11);
        userData.password = hashedPassword;
        userData.roles = ["user"]
        await User.create(userData);

        return NextResponse.json({message: "User created"}, { status: 201})
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error", error}, { status: 500})
    }
}