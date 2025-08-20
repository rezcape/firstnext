import { NextResponse } from "next/server";

const greetings = [
  { language: "English", greeting: "Hello" },
  { language: "Indonesian", greeting: "Halo" },
  { language: "Spanish", greeting: "Hola" },
  { language: "French", greeting: "Bonjour" },
  { language: "Japanese", greeting: "こんにちは" },
  { language: "German", greeting: "Guten Tag" },
  { language: "Korean", greeting: "안녕하세요" },
];

export async function GET(request) {
  return NextResponse.json(greetings);
}
