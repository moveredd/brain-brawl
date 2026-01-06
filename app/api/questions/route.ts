import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get('amount') || '10';
  const category = searchParams.get('category') || '9';
  const difficulty = searchParams.get('difficulty') || 'medium';
  const type = searchParams.get('type') || 'multiple';

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    
    if (data.response_code !== 0) {
      return NextResponse.json(
        { error: 'Failed to fetch questions. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

