import User from "../../../models/user";
import connect from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { email, password, name, gender, birthdate, phone, address, state, country, zipCode, license, speciality, clinic, hospital } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newDoctor = new User({
        email,
        password: hashedPassword,
        name,
        gender,
        birthdate,
        phone,
        address,
        state,
        country,
        zipCode,
        role: "doctor", // Establece el rol a "doctor"
        license,
        speciality,
        clinic,
        hospital
    });

    try {
        await newDoctor.save();
        return new NextResponse("Doctor is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};
