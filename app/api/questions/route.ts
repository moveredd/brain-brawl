import { NextResponse } from "next/server";

const OPEN_TRIVIA_ENDPOINT = "https://opentdb.com/api.php";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = searchParams.get("amount") || "10";
  const category = searchParams.get("category") || "9";
  const difficulty = searchParams.get("difficulty") || "medium";
  const type = searchParams.get("type") || "multiple";

  const url = new URL(OPEN_TRIVIA_ENDPOINT);
  url.searchParams.set("amount", amount);
  url.searchParams.set("category", category);
  url.searchParams.set("difficulty", difficulty);
  url.searchParams.set("type", type);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error("OpenTDB non-200 response:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch questions from provider." },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (data.response_code !== 0 || !Array.isArray(data.results)) {
      return NextResponse.json(
        { error: "No questions available. Please try again shortly." },
        { status: 503 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching questions." },
      { status: 500 }
    );
  }
}

