"use client";

import { useState } from "react";
import { validateListingForm } from "../utils/validation";

export function useListingGenerator() {
  const [platform, setPlatform] = useState("Facebook Marketplace");
  const [item, setItem] = useState("");
  const [condition, setCondition] = useState("");
  const [features, setFeatures] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerateListing() {
    const formError = validateListingForm({
      item,
      condition,
      features,
    });

    if (formError) {
      setValidationError(formError);
      setError("");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");
    setValidationError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          condition,
          features,
          platform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate listing.");
      }

      setResult(data.result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check if Ollama is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyListing() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to copy listing.");
    }
  }

  return {
    platform,
    setPlatform,
    item,
    setItem,
    condition,
    setCondition,
    features,
    setFeatures,
    result,
    error,
    validationError,
    loading,
    copied,
    handleGenerateListing,
    handleCopyListing,
  };
}
