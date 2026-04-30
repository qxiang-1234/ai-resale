export async function POST(req: Request) {
  try {
    const { item, condition, features } = await req.json();

    const prompt = `
You are a friendly and honest second-hand marketplace seller.

Generate a product listing based on the following information:

Item: ${item}
Condition: ${condition}
Features: ${features}

Requirements:
- Do not invent brand, model, or features
- Keep the tone realistic, concise, and friendly
- Mention uncertainty if the information is incomplete
- Output in the following format:

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
      { status: 500 },
    );
  }
}
