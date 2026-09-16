import type { Metadata } from "next";

import { StyleTile } from "@/components/style-tile/StyleTile";

/**
 * Internal design board.
 *
 * `noindex` because it is a review artifact, not a page: it should never show up
 * in search results or be reachable from the site navigation.
 */
export const metadata: Metadata = {
  title: "Style tile",
  robots: { index: false, follow: false },
};

export default function StyleTilePage() {
  return <StyleTile />;
}
