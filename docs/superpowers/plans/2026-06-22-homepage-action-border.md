# Homepage Action Border Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage action cards' broken octagonal edge with the approved continuous Chinese stepped-corner gold frame.

**Architecture:** Keep the existing homepage HTML and behavior unchanged. Build the outer gradient frame and recessed inner keyline with the existing `.poster-frame--action::before` and `::after` pseudo-elements, while `.poster-action-card` continues to own sizing, content placement, and interaction.

**Tech Stack:** Static HTML, CSS pseudo-elements and gradients, Python `unittest`, in-app browser responsive verification.

---

## File Structure

- Modify `tests/test_site.py`: extend the homepage visual contract with the selected stepped-corner frame hooks.
- Modify `styles.css`: replace the current action-card border and clipping treatment; no HTML, JavaScript, JSON, or asset changes.

### Task 1: Implement the stepped-corner action frame

**Files:**
- Modify: `tests/test_site.py:124`
- Modify: `styles.css:701-732`

- [ ] **Step 1: Write the failing CSS contract test**

Add these assertions to `test_homepage_matches_poster_layout_contract`:

```python
self.assertIn("--poster-action-corner", styles_css)
self.assertIn(".poster-frame--action::before", styles_css)
self.assertIn(".poster-frame--action::after", styles_css)
self.assertIn("inset: 2px", styles_css)
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests.test_site.SiteContractTests.test_homepage_matches_poster_layout_contract -v
```

Expected: `FAIL` because the action-corner custom property and active pseudo-element layers do not yet exist.

- [ ] **Step 3: Implement the approved frame**

Update the action-card rules in `styles.css` with this structure:

```css
.poster-action-card {
  --poster-action-corner: 20px;
  border: 0;
  background: transparent;
  clip-path: polygon(
    0 var(--poster-action-corner), 10px var(--poster-action-corner),
    var(--poster-action-corner) 10px, var(--poster-action-corner) 0,
    calc(100% - var(--poster-action-corner)) 0,
    calc(100% - var(--poster-action-corner)) 10px,
    calc(100% - 10px) var(--poster-action-corner), 100% var(--poster-action-corner),
    100% calc(100% - var(--poster-action-corner)),
    calc(100% - 10px) calc(100% - var(--poster-action-corner)),
    calc(100% - var(--poster-action-corner)) calc(100% - 10px),
    calc(100% - var(--poster-action-corner)) 100%,
    var(--poster-action-corner) 100%,
    var(--poster-action-corner) calc(100% - 10px),
    10px calc(100% - var(--poster-action-corner)), 0 calc(100% - var(--poster-action-corner))
  );
}

.poster-frame--action::before,
.poster-frame--action::after {
  content: "";
  position: absolute;
  pointer-events: none;
  clip-path: inherit;
}

.poster-frame--action::before {
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, #fff0b2, #955019 25%, #f7cf69 52%, #733014 77%, #f4ca68);
}

.poster-frame--action::after {
  inset: 2px;
  z-index: 0;
  background: radial-gradient(circle at top, rgba(226, 103, 55, 0.17), transparent 44%), linear-gradient(180deg, #78140e, #3d0706);
  box-shadow: inset 0 0 0 1px rgba(255, 224, 151, 0.34), inset 0 0 0 9px rgba(31, 3, 3, 0.2), inset 0 0 0 10px rgba(216, 157, 55, 0.42), inset 0 -26px 34px rgba(28, 2, 2, 0.24);
}
```

Retain the existing card sizing, typography, content stacking, and shadow declarations around these rules.

- [ ] **Step 4: Run automated verification**

Run:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -v
node --check site.js
git diff --check
```

Expected: all six site tests pass, JavaScript syntax check exits `0`, and `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Verify the real homepage visually**

Open `index.html` through a local HTTP server and inspect widths `375`, `390`, `430`, and `1280`. Confirm both cards have continuous gold stepped corners with no black wedges, equal geometry, visible focus treatment, and no horizontal overflow. Confirm `DINE IN` still targets `dine-in.html` and `TAKE OUT` still targets `外卖菜单.png` with the `download` attribute.

- [ ] **Step 6: Commit the implementation**

```bash
git add styles.css tests/test_site.py
git commit -m "style: refine homepage action card borders"
```

### Task 2: Unify the full-width banner frames

**Files:**
- Modify: `tests/test_site.py:124`
- Modify: `styles.css:886-929`

- [ ] **Step 1: Extend the failing CSS contract test**

Add these assertions to `test_homepage_matches_poster_layout_contract`:

```python
self.assertIn("--poster-banner-corner", styles_css)
self.assertIn(".poster-frame--banner::before", styles_css)
self.assertIn(".poster-frame--banner::after", styles_css)
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests.test_site.SiteContractTests.test_homepage_matches_poster_layout_contract -v
```

Expected: `FAIL` because the banner corner variable and active frame layers do not yet exist.

- [ ] **Step 3: Apply the stepped silhouette and shared gold frame**

Give `.poster-banner` the same 16-point stepped polygon used by the action cards, with `--poster-banner-corner: 20px`, `border: 0`, and `background: transparent`. Use `.poster-frame--banner::before` as the shared outer gold gradient and `.poster-frame--banner::after` as the 2px inset lacquer layer.

Use variant-specific CSS custom properties so the two banners keep their current identities:

```css
.poster-banner--whatsapp {
  --poster-banner-fill: linear-gradient(180deg, rgba(6, 65, 36, 0.98), rgba(3, 44, 26, 0.98));
  --poster-banner-shadow: rgba(0, 20, 10, 0.24);
}

.poster-banner--navigate {
  --poster-banner-fill: linear-gradient(180deg, rgba(104, 18, 13, 0.97), rgba(67, 10, 8, 0.98));
  --poster-banner-shadow: rgba(26, 2, 2, 0.24);
}
```

The inset layer must use `background: var(--poster-banner-fill)` and retain the same inner gold keyline as the action cards.

- [ ] **Step 4: Run full automated and visual verification**

Run the six site tests, JavaScript syntax check, JSON validation, and `git diff --check`. In the browser, verify all four homepage actions share the stepped silhouette at 375px, 390px, 430px, and 1280px with no overflow. Confirm the two banners remain green and red and retain their existing destinations.
