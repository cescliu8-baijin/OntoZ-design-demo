# 询盘消息公司资料侧栏 · Design QA

## 对照基准

- Source visual truth: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-9df2d1c3-27be-4400-af7a-4120b0f0d4bb.png`
- Source pixels: `4198 × 2432`
- Desktop implementation: `/private/tmp/ontoz-inquiry-company-desktop-final.png`
- Desktop pixels / CSS viewport: `1440 × 900` / `1440 × 900`
- Mobile implementation: `/private/tmp/ontoz-inquiry-company-mobile-final.png`
- Mobile pixels / CSS viewport: `390 × 844` / `390 × 844`
- Density normalization: implementation screenshots were captured at 1 CSS pixel per output pixel. The source was proportionally contained to `1440 × 900` for structural comparison; no fidelity finding was based on the source's surrounding black canvas or its different product chrome.
- State: Chris Walker selected, company profile visible, all company sections expanded.

## Comparison Evidence

- Full-view comparison: `/private/tmp/ontoz-inquiry-company-comparison.png`
- Focused right-rail comparison: `/private/tmp/ontoz-inquiry-company-detail-comparison.png`
- The full view confirms the intended three-part composition: conversation list, message workspace, and persistent right detail rail.
- The focused comparison confirms the detail rail keeps the reference's independent header, vertical scrolling, clear content hierarchy, and compact information density while using OntoZ's existing tokens and customer-pool fields.

## Findings

- No remaining P0/P1/P2 issues.
- Fonts and typography: the existing Inter / PingFang SC stack is preserved. Company hierarchy, labels, values, tags, and long-form copy remain readable without unexpected wrapping or truncation.
- Spacing and layout rhythm: desktop columns render at `300px / 480px / 352px` with consistent 10px gutters. The company rail has an independent 68px header and scroll body. Tablet uses a 360px right overlay; mobile uses a single 390px detail view.
- Colors and visual tokens: the implementation reuses OntoZ neutral, indigo, violet, amber, blue, and pink tokens. The inquiry-intent highlight and CRM/product tags retain semantic contrast.
- Image quality and asset fidelity: the reference contains no required product photography or branded raster asset for this feature. All visible controls use the project's existing Lucide icon system; no placeholder or handcrafted asset was introduced.
- Copy and content: company name, country, address, identity, industry, type, website, Facebook, created time, description, business area, products, advantages, CRM stage, tags, owner, score, and main contact are populated from conversation-linked demo profiles using the customer-pool field model.
- Intentional deviation: the reference right rail shows Copilot content. This implementation uses the same rail layout for the requested company profile, with collapsible information groups rather than unrelated Copilot tabs.

## Comparison History

1. Initial responsive pass found a P1 grid-specificity issue: the collapsed desktop grid could remain two columns at a 390px viewport. Fixed with breakpoint-specific high-specificity grid rules. Post-fix evidence: mobile grid reports `390px`, with no horizontal overflow.
2. Initial mobile interaction pass found a P1 accessibility issue: the icon-only company-detail trigger lost its accessible name when its visible label was hidden. Fixed with `aria-label="查看公司资料"`. Post-fix evidence: semantic button lookup succeeds and the profile opens.
3. Final desktop, tablet, and mobile pass found no console warnings/errors, no horizontal overflow, and correct company-profile synchronization across Chris, Mia, and Ava conversations.

## Implementation Checklist

- [x] Three-column desktop layout
- [x] Conversation-linked company profile rendering
- [x] Customer-pool field coverage
- [x] Collapsible company sections
- [x] Desktop collapse/reopen behavior
- [x] Tablet right-side overlay
- [x] Mobile list → chat → company detail → back flow
- [x] Console and overflow checks

## Follow-up Polish

- P3: the narrow conversation-list channel row intentionally remains horizontally scrollable, so the last channel label can be partially clipped until scrolled.

## Zoe 展会营销获客 · Design QA

### 对照基准

- Source visual truth: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-dc591550-613b-4315-9060-bb90622496bc.png`
- Source pixels: `1440 × 3865`
- Completed-flow implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-desktop-final.png`
- Completed-flow pixels / CSS viewport: `1440 × 3199` / `1440 × 1000`
- Same-state desktop implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-desktop-same-state.png`
- Same-state desktop pixels / CSS viewport: `1440 × 1000` / `1440 × 1000`
- Mobile initial implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-mobile-initial.png`
- Mobile progressed implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-mobile-progress.png`
- Mobile pixels / CSS viewport: `390 × 844` / `390 × 844`
- Density normalization: same-state and mobile captures use one output pixel per CSS pixel. The completed-flow browser capture preserves the full conversation but duplicates fixed navigation chrome as a capture artifact; findings about layout and fidelity use the normalized same-state comparison and the main conversation region rather than duplicated chrome.
- State: the focused comparison shows the exhibition search and exhibition information confirmed with the customer-profile step revealed. The completed-flow capture shows all steps confirmed and the task-success state visible.

### Comparison Evidence

- Full-flow comparison: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-design-qa-comparison.png`
- Focused same-state comparison: `/Users/baixing_12345/Documents/OntoZ/zoe-exhibition-focused-qa-comparison.png`
- The full-flow comparison confirms the reference's long-form conversational progression, task summary, primary launch action, and Zoe completion state.
- The focused comparison confirms the same main/assistant column relationship, compact neutral cards, light borders, small UI typography, green confirmation state, and indigo primary action at a matching desktop viewport.

### Findings

- No remaining P0/P1/P2 issues.
- Fonts and typography: the existing Inter / PingFang SC / Microsoft YaHei stack closely matches the compact sans-serif source. Heading, label, helper, chip, and input weights remain legible on desktop and mobile without unexpected truncation.
- Spacing and layout rhythm: desktop preserves a wide conversation column and a persistent Zoe assistant rail, with 8–16px internal card rhythm and compact fields. Mobile becomes a true single column with a horizontally scrollable step rail and no document-level horizontal overflow.
- Colors and visual tokens: the implementation reuses OntoZ neutral, indigo, green, sky, and amber tokens. Confirmation, pending, selected, and primary action states maintain semantic contrast comparable to the source.
- Image quality and asset fidelity: Zoe's completion avatar is a project-owned transparent `1254 × 1254` PNG generated for this feature and displayed without stretching. LinkedIn uses the existing branded SVG, and all other controls use the project's Lucide asset library; no placeholder or handcrafted icon remains.
- Copy and content: the flow contains realistic CES 2027 data, editable customer profiles and countries, acquisition-source choices, channel selection, an editable/regeneratable marketing email, sending settings, computed customer totals, and a clear task-success message.
- Intentional deviation: the reference uses a very narrow icon-only global rail, while this implementation keeps OntoZ's existing full desktop navigation to preserve product consistency. The Zoe flow itself retains the reference's internal step rail and two-pane composition.

### Comparison History

1. Initial desktop console inspection found a P2 asset issue: the bundled Lucide set did not contain a LinkedIn icon, leaving a warning and missing mark. Replaced it with the project's existing `assets/LinkedIn.svg`. Post-fix evidence: a fresh desktop and mobile tab reports no warnings or errors.
2. Mobile verification checked `390 × 844`: document `scrollWidth` equals `390`, the assistant rail is removed from the mobile layout, and the 468px step list scrolls inside its 372px container without widening the page.
3. Interaction verification completed the flow from exhibition confirmation through task launch, confirmed the 800-company summary and five-country copy, then edited the country step. Post-edit evidence: the country controls become enabled, all later steps are hidden, success is cleared, and the task navigation action is disabled until reconfirmation.
4. Production verification completed successfully with `npm run build`.

### Implementation Checklist

- [x] Exhibition search and information confirmation
- [x] Editable customer-profile tags and notes
- [x] Editable country tags and target volume
- [x] Acquisition source, file-import state, and channel selection
- [x] Editable and regeneratable marketing email
- [x] Sender, timing, computed task summary, and launch action
- [x] Zoe completion asset and success state
- [x] Re-edit invalidation of downstream results
- [x] Desktop and 390px mobile checks
- [x] Console, overflow, syntax, and production build checks

### Follow-up Polish

- P3: the desktop global navigation intentionally remains expanded to match the existing OntoZ shell rather than the reference's icon-only rail.

## Previous QA Record · 客户池公司详情 CRM

- Previous source: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-896bb206-b905-453c-b238-4bb1a8eb773b.png`
- Previous implementation evidence: `customer-detail-crm-desktop-final.png`, `customer-detail-crm-focused-final.png`, and `customer-detail-crm-mobile-final.png` in the project root.
- Previous scope: split customer-pool company details into 基础信息 and CRM信息; add hardware/software advantages, score, created time, products, stage, custom labels, and owner.
- Previous verification: drawer open/close, CRM collapse/re-expand, accessible expanded state, 390px mobile layout, zero horizontal overflow, and no console warnings/errors.
- Previous result: passed with no remaining P0/P1/P2 findings.

## Zoe 首页 Hero · Design QA

### 对照基准

- Source visual truth: `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-065c27df-6a4e-478a-8d8c-192bb61769db.png`, combined with the explicit instruction to remove the Hero container border and background.
- Source pixels: `3038 × 582`; normalized reference size: `1519 × 291` at 2× source density.
- Desktop implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-hero-desktop.png`.
- Tablet implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-hero-tablet.png`.
- Mobile implementation: `/Users/baixing_12345/Documents/OntoZ/zoe-hero-mobile.png`.
- Implementation pixels / CSS viewports: `1440 × 900`, `768 × 900`, and `390 × 844`, each captured at one output pixel per CSS pixel.
- State: Zoe overview, default live-task state, before opening the task-creation flow.

### Comparison Evidence

- Full-view comparison: the source, desktop implementation, and mobile implementation were opened together in one visual comparison input.
- Focused desktop Hero evidence: `/Users/baixing_12345/Documents/OntoZ/zoe-hero-desktop-focused.png`.
- The desktop comparison confirms that the eyebrow, display title, description, two actions, and right-side status card preserve the source hierarchy while the large rounded border, gradient fill, and outer shadow are removed.
- The mobile comparison confirms a single-column Hero, full-width actions, readable title wrapping, and no document-level horizontal overflow.

### Findings

- No remaining P0/P1/P2 issues.
- Fonts and typography: the shared agent Hero typography is retained: Songti SC / STSong for the 48px desktop display title, the existing sans-serif stack for labels and body copy, and the shared 34px mobile title scale. Copy wraps without truncation.
- Spacing and layout rhythm: the Hero now uses the same open page composition as the other agent home screens, with `12px 0 16px` desktop padding, a 32px main/status gap, and no outer radius or shadow. At `390px`, the Hero stacks vertically and keeps 24px between content and status.
- Colors and visual tokens: the removed container resolves to transparent with no background image. Zoe's indigo actions and emerald live state remain semantically consistent with the product tokens.
- Image quality and asset fidelity: the Hero contains no raster imagery. Existing Lucide icons are preserved, and no placeholder or handcrafted visual asset was introduced.
- Copy and content: all source Hero copy remains unchanged, including the Zoe label, headline, description, task count, coverage, and latest-update text.

### Comparison History

1. The implementation pass removed `.zoe-hero-card` from the shared surface treatment, replacing the bordered gradient container with an open 210px Hero and matching responsive padding. Post-change computed styles report `border: 0`, `background-image: none`, `background-color: transparent`, `box-shadow: none`, and `border-radius: 0` at desktop, tablet, and mobile widths.
2. Responsive verification found no horizontal overflow at `1440px`, `768px`, or `390px`. The primary action and customer-pool action remain visible and usable.
3. Interaction verification confirmed that “创建获客任务” opens the task-creation screen, “返回获客总览” restores the overview, “查看客户池” retains `#customers`, and the browser console reports zero errors.

### Implementation Checklist

- [x] Remove Hero outer border
- [x] Remove Hero outer background/gradient
- [x] Remove Hero outer radius and shadow
- [x] Match other agent home Hero spacing
- [x] Preserve Zoe status-card hierarchy
- [x] Verify desktop, tablet, and mobile layouts
- [x] Verify Hero actions and console errors

### Follow-up Polish

- No P3 follow-up is required for the requested Hero scope.

final result: passed
