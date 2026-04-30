export const platforms = [
  "Facebook Marketplace",
  "eBay",
  "Xianyu",
  "Xiaohongshu",
];

export function getPlatformBadgeLabel(platform: string) {
  switch (platform) {
    case "Facebook Marketplace":
      return "Facebook";
    case "eBay":
      return "eBay";
    case "Xianyu":
      return "闲鱼";
    case "Xiaohongshu":
      return "小红书";
    default:
      return platform;
  }
}
