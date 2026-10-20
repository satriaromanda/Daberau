/** Prefixes a /public asset path with the base path (next/image does not add it for static exports). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
