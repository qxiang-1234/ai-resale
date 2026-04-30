function getPlatformInstruction(platform: string) {
  switch (platform) {
    case "eBay":
      return `
Platform: eBay
Style requirements:
- Use a clear, structured, and trustworthy tone.
- Sound more professional than casual.
- Focus on item condition and practical features.
- Avoid hype or overly emotional language.
`;

    case "Xianyu":
      return `
Platform: Xianyu
Style requirements:
- Tone should be casual, friendly, and realistic.
- Sound like an individual seller, not a professional store.
- Avoid exaggerated claims.
`;

    case "Xiaohongshu":
      return `
Platform: Xiaohongshu
Style requirements:
- Tone should be friendly, lifestyle-oriented, and slightly polished.
- Keep it realistic and not overly salesy.
- Avoid exaggerated marketing language.
`;

    case "Facebook Marketplace":
    default:
      return `
Platform: Facebook Marketplace
Style requirements:
- Use a friendly, casual, and concise tone.
- Sound like a real person selling a used item locally.
- Avoid overly professional or salesy language.
`;
  }
}

function isChinesePlatform(platform: string) {
  return platform === "Xianyu" || platform === "Xiaohongshu";
}

function getOutputLanguage(platform: string) {
  return isChinesePlatform(platform) ? "Chinese" : "English";
}

function normalizeGeneratedText(text: string, platform: string) {
  const chinesePlatform = isChinesePlatform(platform);

  let normalizedText = text.trim();

  if (!normalizedText.includes("Suggested Price Range:")) {
    normalizedText = `${normalizedText}

Suggested Price Range:
${
  chinesePlatform
    ? "暂无足够市场数据，建议参考同平台相似商品后再定价。"
    : `Not enough market data. Please compare similar local listings on ${platform} before setting the final price.`
}`;
  }

  if (
    chinesePlatform &&
    normalizedText.includes("Suggested Price Range: 谨慎定价")
  ) {
    normalizedText = normalizedText.replace(
      "Suggested Price Range: 谨慎定价",
      "Suggested Price Range:\n暂无足够市场数据，建议参考同平台相似商品后再定价。",
    );
  }

  if (
    chinesePlatform &&
    normalizedText.includes("Suggested Price Range:\n谨慎定价")
  ) {
    normalizedText = normalizedText.replace(
      "Suggested Price Range:\n谨慎定价",
      "Suggested Price Range:\n暂无足够市场数据，建议参考同平台相似商品后再定价。",
    );
  }
  normalizedText = normalizedText.replaceAll("。，", "。");
  return normalizedText;
}

export async function POST(req: Request) {
  try {
    const { item, condition, features, platform } = await req.json();

    const selectedPlatform = platform || "Facebook Marketplace";
    const platformInstruction = getPlatformInstruction(selectedPlatform);
    const outputLanguage = getOutputLanguage(selectedPlatform);

    const userPrompt = `
Generate a second-hand product listing for the selected platform.

${platformInstruction}

Output language: ${outputLanguage}

Use only these details:
Item: ${item}
Condition: ${condition}
Features: ${features}

Required output format:

Title:
Description:
Condition:
Features:
Suggested Price Range:

Rules:
- Output every section in ${outputLanguage}.
- Translate the provided item, condition, and features into ${outputLanguage} when needed.
- The title must only describe the item and provided features.
- The description must be 1-2 sentences.
- The condition must be based only on the provided condition.
- The features must be based only on the provided features.
- Do not add any detail that is not in the provided fields.
- If there is not enough pricing information, write a cautious pricing note in ${outputLanguage} instead of a specific price.
- Do not output anything else.
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
You are a careful second-hand marketplace listing formatter.

Your job is to turn provided item details into a clean listing for the selected platform.

Core rules:
- Do not greet the user.
- Do not introduce yourself.
- Do not ask questions.
- Do not use placeholders.
- Do not infer missing details.
- Do not invent unsupported details.
- Follow the requested output language exactly.
- Translate user-provided item, condition, and features into the requested output language when needed.
- Do not mention original price or discount unless provided by the user.
- Do not invent a specific price range unless the user provides market data or price-related information.
- If price information is uncertain, use a cautious price note instead of a specific number.
- Do not use words like brand, model, size, color, material, wiring, damage, safety, clean, excellent, vintage, charming, perfect, amazing, or deal unless provided by the user.
- Follow the required output format exactly.
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

    if (!response.ok) {
      throw new Error("Failed to call local AI model.");
    }

    const data = await response.json();

    const generatedText = normalizeGeneratedText(
      data.message?.content || "",
      selectedPlatform,
    );

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
