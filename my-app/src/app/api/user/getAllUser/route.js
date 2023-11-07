import connectToDB from "@/app/dataBase";
import Converstation from "@/app/model/converstation";
import User from "@/app/model/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    connectToDB();

    const users = await User.find({});

    if (users) {
      return NextResponse.json({
        success: true,
        data: users,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "can not get the data",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "some thing is wrong please try again leter",
    });
  }
}
