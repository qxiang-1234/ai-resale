export async function POST(req: Request) {
  try {
    const { item, condition, features } = await req.json();

    const prompt = `
You are a marketplace listing generator.

You must generate a ready-to-post second-hand product listing.
Do not chat with the user.
Do not introduce yourself.
Do not ask follow-up questions.
Do not say you are an AI assistant.
Do not use placeholders.
Do not invent details that were not provided.

Bad output example:
"Hi there! I am an AI assistant. What would you like to list?"

Good output example:
Title:
Used Standing Lamp with Adjustable Angle

Description:
Selling a used standing lamp in good condition. It has 3 brightness levels and an adjustable angle, making it useful for reading, working, or adding extra light to a room.

Suggested Price Range:
$15 - $30

Now generate a listing using only this information:

Item: ${item}
Condition: ${condition}
Features: ${features}

Return only this exact format:

Title:
Description:
Suggested Price Range:
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false,
        options: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call local AI model.");
    }

    const data = await response.json();

    return Response.json({
      result: data.response,
    });
  } catch (error) {
    console.error("Generate listing error:", error);

    return Response.json(
      {
        error: "Failed to generate listing.",
      },
      { status: 500 }
    );
  }
}