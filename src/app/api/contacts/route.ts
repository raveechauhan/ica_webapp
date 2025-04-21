import { NextResponse } from "next/server";
import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function POST(req: Request) {

  if (!BREVO_API_KEY) {
    console.error("Brevo API Key is missing!");
    return NextResponse.json(
      { message: "Brevo API Key is missing. Check your .env.local file." },
      { status: 500 }
    );
  }

  try {
    const requestData = await req.json();
    const { fullName, program, description, email, phone, city } = requestData;

    const payload = {
      email,
      attributes: {
        NAME: fullName,
        EMAIL: email,
        PHONE: phone,
        CITY: city,
        PROGRAM: program,
        DESCRIPTION: description,
      },
      listIds: [3], 
      updateEnabled: true
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      payload,
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Brevo API Response:", response.data);
    return NextResponse.json({ message: "Success", data: response.data }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Brevo API Axios Error:", error.response?.data || error.message);
      return NextResponse.json(
        { message: "Error", error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("Unexpected Error:", error);
      return NextResponse.json(
        { message: "Unexpected error occurred", error: String(error) },
        { status: 500 }
      );
    }
  }
}
