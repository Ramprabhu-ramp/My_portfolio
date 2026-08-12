import { placeholderContent } from "./placeholder-data";
import type { PortfolioContent } from "./types";

// Single entry point the public site uses to read content.
//
// Today this just returns the static placeholder object. Once the database
// is wired up, this function's body will change to query Postgres/Prisma
// instead — no other file needs to change, since every page/component
// reads content through here.
export async function getContent(): Promise<PortfolioContent> {
  return placeholderContent;
}
