# Homepage Action Border Design

## Scope

Unify the irregular border treatment of the homepage `DINE IN`, `TAKE OUT`, `CONTACT US`, and `TAP TO NAVIGATE` actions. Preserve their dimensions, content, links, responsive layout, and existing red or green lacquer treatments.

## Selected Direction

Use the approved **C: Chinese stepped-corner frame** direction.

- Replace the current single octagonal clipping path with a stepped, key-pattern-inspired corner silhouette.
- Render a continuous multi-stop gold gradient around the complete silhouette so no black triangular gaps remain at the corners.
- Add a recessed inner gold keyline to give the frame depth without introducing extra DOM elements.
- Keep the inner red lacquer panel and current shadows, but soften the edge transition so the frame reads as one crafted object.
- Apply the same geometry to both action cards and both full-width banners for visual consistency.

## Implementation

Implement the border entirely in `styles.css` using the existing `.poster-action-card`, `.poster-frame--action`, `.poster-banner`, and `.poster-frame--banner` hooks. Share one stepped-corner geometry variable across cards and banners. Use pseudo-elements for the outer gradient frame and inner keyline, with content remaining above both layers. Keep the WhatsApp banner green and navigation banner red. No HTML, JavaScript, asset, or data-contract changes are required.

The CSS must retain keyboard focus visibility and the full anchor hit area. At mobile widths, the stepped corners should remain proportionate and must not clip icons, headings, descriptions, or arrow controls.

## Verification

- Inspect the homepage at 375px, 390px, 430px, and desktop widths.
- Confirm all four corners have continuous gold edging with no exposed black wedges.
- Confirm both action cards retain equal dimensions and aligned content.
- Confirm both banners use the same stepped-corner silhouette while retaining their green and red interiors.
- Confirm `DINE IN` navigation and `TAKE OUT` download behavior remain unchanged.
- Run the existing site contract tests and `git diff --check`.
