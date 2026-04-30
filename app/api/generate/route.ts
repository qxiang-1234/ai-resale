export async function POST(req: Request) {
  try {
    const { item, condition, features, platform } = await req.json();

    const selectedPlatform = platform || "Facebook Marketplace";

    const userPrompt = `
Write a second-hand marketplace listing using only the provided fields.

Provided fields:
Item: ${item}
Condition: ${condition}
Features: ${features}

Required format:

Title:
Description:
Condition:
Features:
Suggested Price Range:

Rules:
- The title must only describe the item and provided features.
- The description must be 1-2 sentences.
- The condition must be copied from the provided condition.
- The features must be copied from the provided features.
- Do not add any detail that is not in the provided fields.
`;

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:1.5b",
        stream: false,
        messages: [
          {
            role: "system",
            content: `
You are a careful listing formatter.

Your job is to turn provided item details into a clean listing.

Do not be creative.
Do not use marketing words like vintage, charming, excellent, perfect, amazing, deal, discount, original price, damage, wiring, safe, clean, height, size, color, material, brand, or model unless those words are provided by the user.
Do not infer missing details.
Do not add unsupported details.

Output only the requested format.
`,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        options: {
          temperature: 0,
        },
      }),
    });

    const data = await response.json();

    let generatedText = data.message?.content || "";

    if (!generatedText.includes("Suggested Price Range:")) {
      generatedText = `${generatedText.trim()}

Suggested Price Range:
Not enough market data. Please compare similar local listings before setting the final price.`;
    }

    return Response.json({
      result: generatedText,
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
