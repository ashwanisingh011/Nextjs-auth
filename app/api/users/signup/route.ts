import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs";



connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        return NextResponse.json({error: message}, {status: 500});
    }
}