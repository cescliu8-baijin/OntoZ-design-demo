**Source visual truth**

- `/var/folders/b2/c8cw_gq15rl366xv9frqp13m0000gn/T/codex-clipboard-896bb206-b905-453c-b238-4bb1a8eb773b.png`
- Source pixels: 753 × 481. Focused desktop crop of the lower “基础信息” fields and the following CRM block, light theme.

**Implementation evidence**

- Desktop full view: `/Users/baixing_12345/Documents/OntoZ/customer-detail-crm-desktop-final.png`
- Focused comparison crop: `/Users/baixing_12345/Documents/OntoZ/customer-detail-crm-focused-final.png`
- Mobile: `/Users/baixing_12345/Documents/OntoZ/customer-detail-crm-mobile-final.png`
- Desktop implementation pixels: 1528 × 924 at a 1528 × 924 CSS viewport and 1:1 screenshot density.
- Focused implementation pixels: 660 × 404, cropped from the desktop screenshot without scaling.
- Mobile implementation pixels: 390 × 844 at a 390 × 844 CSS viewport and 1:1 screenshot density.
- State: `#customers`, Sustainable Power Solutions selected, customer-detail drawer open, scrolled to the lower company fields with both “基础信息” and “CRM信息” expanded.
- Primary interactions tested: open customer drawer; collapse and re-expand CRM信息; verify `aria-expanded` and content visibility; resize to mobile; confirm zero document and drawer horizontal overflow.
- Browser console checked after final reload and interaction pass. No errors or warnings.

**Findings**

- No actionable P0/P1/P2 issues remain.
- Fonts and typography: the project’s existing Inter/PingFang/system stack, 12 px detail text, muted labels, weights, line heights, and wrapping preserve the dense enterprise UI character of the reference.
- Spacing and layout rhythm: the two-column definition list, compact chips, section divider, 48 px collapsible headings, and CRM row spacing closely follow the reference structure. The implementation crop is narrower because it reflects the existing drawer’s responsive company column rather than the reference crop width.
- Colors and visual tokens: existing OntoZ neutral, pink, violet, orange, and indigo tokens are reused. Product chips remain pink; custom CRM labels use violet to distinguish their meaning without changing the established palette.
- Image quality and asset fidelity: this region contains no raster imagery. The chevrons use the project’s bundled Lucide icon library; no placeholder or custom-drawn asset was introduced.
- Copy and content: all omitted fields shown in the reference are present—公司类型、硬件优势、软件优势、推荐分数、创建时间、主营产品、当前阶段、自定义标签、归属人. Per the user’s explicit request, the second section is titled “CRM信息” rather than the screenshot’s “CRM状态”. Company-specific values remain realistic for the selected customer instead of copying the screenshot’s unrelated bakery data.

**Focused region comparison**

- The 753 × 481 source crop and 660 × 404 implementation crop were opened together in one comparison input.
- Both show the same field order and hierarchy: company type, hardware/software advantages, recommendation score, creation time, pink product chips, then a separately headed CRM section with stage, custom labels, and owner.
- Remaining visible differences are intentional data adaptation and the user-authoritative “CRM信息” heading; neither is an actionable fidelity issue.

**Comparison history**

- Pass 1: the initial focused browser clip included non-content canvas because clip coordinates were affected by browser capture scaling. Re-cropped the final 1528 × 924 screenshot directly at original pixel density.
- Pass 2: the CRM heading showed a focus-visible outline after toggle testing. Moved keyboard focus to the next control and recaptured; the final focused crop has the settled, unfocused visual state and no P0/P1/P2 mismatch.
- Responsive pass: verified the complete field set at 390 × 844. Document, drawer body, and panel widths all equal 390 px, with no horizontal overflow.

**Implementation checklist**

- [x] Split 公司详情 into 基础信息 and CRM信息.
- [x] Add hardware advantage, software advantage, recommendation score, creation time, and main products.
- [x] Add current stage, custom labels, and owner.
- [x] Make both company-detail sections independently collapsible with accessible expanded state.
- [x] Verify build, browser interactions, console, focused visual comparison, and mobile overflow.

**Follow-up polish**

- None required for this scope.

final result: passed
