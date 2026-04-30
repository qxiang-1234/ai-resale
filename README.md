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
- Component-level styling with CSS Modules

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
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
```

## Project Structure

```text
app/
  api/
    generate/
      route.ts
  components/
    ListingForm.tsx
    ListingForm.module.css
    ListingPreview.tsx
    ListingPreview.module.css
  hooks/
    useListingGenerator.ts
  utils/
    platform.ts
    validation.ts
  page.tsx
  page.module.css
```

## How It Works

1. The user selects a resale platform.
2. The user enters item name, condition, and features.
3. The frontend validates the input.
4. The frontend sends the input to a Next.js API route.
5. The backend builds a platform-specific prompt.
6. The API route calls a local LLM through Ollama.
7. The generated listing is normalized and returned to the frontend.
8. The user can copy the final listing.

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Ollama

Download and install Ollama:

```text
https://ollama.com
```

### 3. Pull the local model

```bash
ollama run qwen2.5:1.5b
```

Keep Ollama running while using the app.

### 4. Start the development server

In a separate terminal:

```bash
npm run dev
```

### 5. Open the app

```text
http://localhost:3000
```

## Example Input

```text
Platform: Facebook Marketplace
Item: standing lamp
Condition: used, good condition
Features: 3 brightness levels, adjustable angle
```

## Example Output

```text
Title:
Standing Lamp with Adjustable Brightness

Description:
A used standing lamp in good condition with 3 brightness levels and an adjustable angle.

Condition:
Used, good condition

Features:
3 brightness levels, adjustable angle

Suggested Price Range:
Not enough market data. Please compare similar local listings before setting the final price.
```

## Design Decisions

### Local LLM Instead of Paid API

This project uses Ollama to run a local model, which avoids API cost during development and allows offline experimentation.

### Platform-Specific Prompting

Each platform has different expectations:

- Facebook Marketplace: casual and local
- eBay: structured and trustworthy
- Xianyu: casual Chinese resale tone
- Xiaohongshu: polished lifestyle-oriented Chinese tone

The backend maps each platform to a different prompt strategy.

### Output Language Strategy

The app determines the output language based on the selected platform. Facebook Marketplace and eBay use English, while Xianyu and Xiaohongshu use Chinese.

### Output Normalization

LLM output can be inconsistent, so the backend includes fallback logic to keep the generated listing usable even when the model misses certain fields.

### Conservative Pricing

The app avoids hard-coded price suggestions. If there is not enough market data, it returns a cautious pricing note instead of inventing a price.

### CSS Modules for Component Styling

The UI uses CSS Modules to keep styles scoped to individual components. This helps avoid global CSS conflicts and makes component-level styling easier to maintain as the project grows.

### Custom Hook for Listing Logic

The async listing generation logic is moved into a custom hook. This keeps the page component focused on layout and rendering while keeping state management and side effects reusable and easier to maintain.

### Component Separation

The UI is split into separate components:

- `ListingForm` handles user input
- `ListingPreview` handles generated output display

This improves readability and makes the project easier to extend.

## Future Improvements

- Image upload and vision-based item recognition
- Similar listing search for better pricing suggestions
- Streaming response UI
- Listing history
- Editable generated sections
- More platform templates
- User authentication
- Deployment with cloud-based model option

## Interview Talking Points

- Built an AI-powered resale assistant using Next.js and a local LLM
- Designed platform-specific prompt strategies for different resale marketplaces
- Added multi-language output support for English and Chinese platforms
- Improved UX with loading states, input validation, badges, and copy-to-clipboard
- Added backend output normalization to handle inconsistent LLM responses
- Used CSS Modules for scoped component styling
- Refactored stateful async logic into a custom React hook
- Split the UI into reusable form and preview components
- Used local models during development to reduce cost and improve iteration speed
