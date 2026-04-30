# AI Resale Copilot

AI Resale Copilot is a local AI-powered assistant that helps users generate second-hand product listings for different resale platforms.

The project was inspired by the real experience of preparing to move and selling many second-hand items online. Writing listing descriptions, adjusting tone for each platform, and estimating pricing can be repetitive, so this tool helps simplify that workflow.

## Features

- Generate second-hand product listings from basic item details
- Support multiple resale platforms:
  - Facebook Marketplace
  - eBay
  - Xianyu
  - Xiaohongshu
- Platform-specific tone and language adaptation
- Local LLM integration with Ollama
- Prompt engineering for structured listing output
- Output fallback for missing pricing information
- Copy-to-clipboard button
- Loading skeleton while generating
- Platform badges
- Basic input validation

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Ollama
- qwen2.5:1.5b local model

## Architecture

```text
User Input
↓
Next.js Frontend
↓
Next.js API Route
↓
Ollama Local LLM
↓
Generated Listing
↓
Frontend Display