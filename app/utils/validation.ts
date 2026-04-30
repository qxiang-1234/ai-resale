type ListingFormValues = {
  item: string;
  condition: string;
  features: string;
};

export function validateListingForm({
  item,
  condition,
  features,
}: ListingFormValues) {
  if (!item.trim()) {
    return "Please enter an item name.";
  }

  if (!condition.trim() && !features.trim()) {
    return "Please enter at least condition or features.";
  }

  return "";
}
