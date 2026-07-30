# Design QA

- Source visual truth: `C:\Users\Nekos\Downloads\生成画像1.png`
- Current hero implementation: live WebGL topology generated from `public/models/network-cat.glb`
- Implementation screenshot: unavailable
- Intended viewport: desktop portrait reference, 864px wide
- Source pixels: 864 x 1792
- Implementation pixels: unavailable
- CSS viewport and density normalization: unavailable
- State: Home, About, and Service positions along one continuous network

## Full-view comparison evidence

Blocked. No in-app browser is available in this session, so a browser-rendered implementation screenshot could not be captured and placed beside the reference.

## Focused region comparison evidence

Blocked for the same reason. The cat silhouette, network density, high-DPI point rendering, translucent cards, and scroll-driven camera states could not be visually compared in-browser.

## Findings addressed from the previous implementation

- Increased canvas density from a maximum DPR of 1.5 to 2.
- Replaced square point sprites with high-DPI circular shader points and soft halos.
- Increased antialiasing from zero to four-sample multisampling.
- Removed fixed depth-of-field processing that blurred the desktop canvas.
- Removed the raster hero cat and every procedural approximation so only one real seated-cat topology remains.
- Merged and welded the complete seated-cat mesh, then tessellated it into 1,653 nodes, 3,272 triangles, and 4,952 unique edges.
- Added an invisible depth prepass so rear nodes and edges cannot read as a second overlapping cat.
- Weighted node size and edge brightness by topology, crease, and view silhouette so the cat outline remains the visual focus.
- Moved pointer proximity and emerald response into GPU shaders; no cat or terrain color buffers are rewritten per frame.
- Replaced random floor edges with an adjacent-cell triangulated terrain.
- Removed square `PointsMaterial` pulses and rendered every node through the circular shader.
- Separated floating depth particles from the edge graph to prevent giant stray triangles.
- Removed the central emerald route and its animated pulses.
- Kept the cat nodes and edges at stable brightness instead of fading or darkening them during scroll.
- Moved the cat farther right and deeper into the hero composition.
- Added a scroll-driven turn and procedural node-and-edge gait so the cat walks away into the scene as the camera advances.
- Extended the live terrain across both sides and beyond the camera endpoint.
- Added a sparse continuous network volume along both side walls and overhead, while retaining an open center around the cat and page copy.
- Reduced full-screen blur and changed cards to restrained dark translucent surfaces with thin silver borders.
- Matched the reference more closely by simplifying the navigation and reducing the hero typography weight and size.
- Preserved `public/NekosanQ.png` and `public/icon.svg` without modification.

## Static verification

- `npm run lint`: passed
- `npm run build`: passed
- Changed-file Prettier check: passed
- Full `npm run check`: ESLint passed; Prettier stopped on the pre-existing `compose.yml` formatting
- Local HTTP response on port 3000: 200
- Latest connected-browser development log after the final compile: no new shader or runtime errors

## Comparison history

- Iteration 1: the user reported low image quality and major drift from the selected image.
- Iteration 2: rendering resolution, node shader, geometry density, network composition, postprocessing, and surface styling were rebuilt. Post-fix browser evidence is unavailable.
- Iteration 3: the user supplied a browser screenshot showing that the node shader had failed to compile, leaving only dense edge geometry. The conflicting shader attribute was renamed, the cat was rebuilt toward a left-facing seated silhouette, background connectivity was reduced, and edge opacity was lowered. A refreshed browser screenshot is still required for post-fix comparison.
- Iteration 4: the user reported continuing quality drift. Random geometry was replaced with intentional topology, fixed DOF was removed, Bloom was limited to bright nodes, navigation and typography were simplified, and a high-resolution reference-derived hero artwork was integrated beneath the interactive 3D layer. A refreshed browser screenshot is still required for post-fix comparison.
- Iteration 5: the user identified a second faint cat shape, the central emerald route, changed BigText placement, changed navigation, finite terrain depth, and Service panel backgrounds. The procedural WebGL cat and both route layers were removed, the terrain was widened and extended past the camera endpoint, the header and logo were restored from commit `fa95619`, the old BigText position was restored, and Service panel backgrounds were removed. A refreshed browser screenshot is still required for post-fix comparison.
- Iteration 6: the remaining raster cat was replaced with a left-facing seated 3D mesh. The complete mesh is now rendered as one high-density node-and-edge topology with topology-aware brightness, a depth prepass, high-DPI point sprites, GPU pointer response, and a subtle deformation pass. The terrain was also moved to uniform-only GPU animation. Production build, lint, local HTTP, and the post-compile browser log pass, but screenshot comparison remains unavailable.
- Iteration 7: the cat was moved right and farther back, its scroll opacity fade was removed, and scroll now turns it into the scene before driving a procedural walking cycle and deeper Z travel. The environment was expanded from a floor-only field into a sparse side-and-overhead network tunnel that continues through the page. Production build, lint, local HTTP, and the latest development log pass; screenshot comparison remains unavailable.
- Iteration 8: the supplied `生成画像1.png` was re-opened as the visual truth. The tunnel network and procedural cat walking were removed. The cat is now a stable, static high-density topology at the right side of the hero; its tessellation was increased for a finer silhouette. The environment now uses a wide continuous terrain plus detached constellation patches at varied heights and depths, avoiding an enclosing tunnel while retaining spatial depth. Production build, lint, local HTTP, and the latest development log pass. The in-app browser reports no available browser backend, so a browser-rendered comparison remains blocked.
- Iteration 9: the cat was shifted farther right and rotated for a cleaner left-facing profile. Detached constellation clusters were removed entirely. The terrain now starts behind the camera and expands to 53+ world units across at the foreground, covering the near field and both sides. A separate GPU flight field introduces 18 angular network fragments that recycle from deep space toward and past the camera according to scroll progress, with silver-to-emerald depth accents. Production build and lint pass; browser comparison remains unavailable.
- Iteration 10: the angular flight fragments were removed. The cat was moved farther right and rotated further toward a readable side profile. The near terrain now spans 63+ world units and grows wider with depth. The terrain nodes and matching edges share a GPU wave deformation driven by time and scroll, so the network itself moves without breaking connections. The ambient field was expanded to 1,450 independent circular star nodes with depth, varied scale, drift, and twinkle. Production build and lint pass; browser comparison remains unavailable.
- Iteration 11: the ambient star field was increased to 3,200 circular nodes and the desktop cat position moved farther right while mobile placement remains constrained. Navigation was rebuilt as a slim translucent capsule, hero typography was reduced to an extra-light optical weight with a restrained silver-to-emerald gradient, and both headline and supporting copy now type with visible cursors. About and Service surfaces were redesigned with thin borders, larger negative space, light typography, compact metadata labels, restrained glass, and consistent emerald interaction states while preserving all original content and image assets. Production build and lint pass; browser comparison remains unavailable.
- Iteration 12: compact Font Awesome icons were restored to every desktop navigation item while retaining the slim capsule. Hero display weight was increased from extra-light to regular. The previous IntersectionObserver fade was replaced by GSAP ScrollTrigger entrances: About and Service cards now arrive sequentially from depth with perspective rotation, scale, vertical travel, blur resolution, and eased opacity. Hovering a card reduces competing-card saturation and opacity so the active surface becomes visually dominant. Reduced-motion users still receive static content. Production build and lint pass; browser comparison remains unavailable.
- Iteration 13: section-header logo icons were removed. Service items were separated into 58-66vh stages with substantially larger vertical rhythm, stronger perspective entrances, larger visuals, and borderless transparent composition. Service actions were rebuilt as filled emerald controls with elevated hover motion and glow. About header icons now use fixed alignment boxes; the protected user avatar is shown uncropped with internal space, while the Group image was enlarged. Skills retain the original icon asset and add a masked animated technology-name rail. Header identity, hero title, service imagery, and the new full footer receive restrained multi-layer glow and backdrop blur. Production build and lint pass; browser comparison remains unavailable.
- Iteration 14: the unreliable ScrollTrigger visibility gate was replaced with an IntersectionObserver-driven GSAP entrance, an initial-viewport path, and a 2.4-second safety reveal so About content cannot remain hidden. Social controls now use rounded-square glass surfaces; the navigation capsule was tightened to a rounded rectangle. Service visuals are circular, achievement chips use glassmorphism, and action controls changed from filled emerald to luminous outline-only glass. The expanded footer panel and navigation were removed, leaving centered copyright text only. Production build and lint pass; browser comparison remains unavailable.
- Iteration 15: About cards and its section heading were removed from all reveal wrappers and now render unconditionally, which also restores the mobile skills card. Social controls now use a near-black glass gradient with only a restrained emerald tint. Service history confirmed the original image slot was 128px; the current slot was reduced from 224px to 128-144px, uses the original PNG directly without Next image recompression, and requests full source quality. Service cursor-dependent dimming, scaling, translation, and image hover motion were removed. The editorial alternating layout keeps only scroll entrance motion and adopts the quieter spacing and hierarchy seen in current Linear, Vercel, and Resend product pages. Production build and lint pass; browser comparison remains unavailable.
- Iteration 16: commit `e11f054` was inspected to confirm the last known visible About structure and its three card components. The current server-rendered HTML was also checked and contains `About me`, `Profile`, `My Skills`, and `My Group`. About remains free of reveal wrappers, and CSS now explicitly forces the section, direct children, and cards to visible opacity while removing the remaining `:has()` hover-dimming rule. Navigation now shares the social controls' near-black emerald-tinted glass. Service image slots increased to 144-160px, retain direct original PNG delivery, and use `object-contain` padding so circular masks do not crop the artwork. Production build and lint pass; browser comparison remains unavailable.
- Iteration 17: About was rebuilt into an explicit high-z-index `about-section` and three-column `about-grid` based on the visible `e11f054` structure, with no reveal components. Its section, grid, items, cards, and descendants now explicitly enforce display, opacity, and visibility to prevent inherited or stale animation state from hiding content. Server HTML still contains every About heading and card label. Service image wrappers no longer add black background or padding; the original PNG now fills the circular mask with a slight 1.03 scale so no wrapper ring is visible. Production build and lint pass. Chrome and the in-app browser are unavailable, so screenshot confirmation remains blocked.
- Iteration 18: About cards now use a visibility-safe GSAP depth entrance that never sets opacity below one, while retaining the explicit CSS visibility guard. Profile and Group use identical 80px media slots, shared header/icon geometry, body rhythm, and footer alignment. Skills was rebuilt as a compact black-glass stack console with a restrained icon sprite, technology rail, and infrastructure row. Navigation is now black-dominant with emerald reflections limited to its top and bottom edges, and the protected top-left icon is aligned in a matching 40px shell. The emerald halo and blur were removed from Service image containers. Production build and lint pass; browser comparison remains unavailable.
- Iteration 19: the ambient depth field increased from 3,200 to 4,800 stars with a broader size distribution, brighter silver response, and stronger selective bloom. The top-left navigation identity is circular. About entrances now take 1.85 seconds with wider 220ms staging while never reducing visibility. Profile and Group load their original high-resolution sources at 320px and crop beyond the circular mask so no internal rectangular image boundary is visible. The external technology sprite was removed; Skills now mirrors the neighboring cards with an 80px summary area and an adaptive Stack Index generated from grouped data, so new technologies update counts and overflow-safe rows automatically. Production build and lint pass; browser comparison remains unavailable.
- Iteration 20: About no longer uses its time-based safety reveal. Its three cards remain transformed until at least 18% of each card enters a viewport contracted by 12% at the bottom, so the 1.85-second staged entrance begins in response to scrolling rather than elapsed page time. Profile and Group crops were relaxed from 1.42/1.68 to 1.16/1.30. Skills was abstracted from named technologies into three durable capability fields: Product Engineering, Platform Systems, and Cloud Operations. The avatar and Skills-specific styles touched in this iteration were moved from global CSS to Tailwind utilities. Production build and lint pass; browser comparison remains unavailable.
- Iteration 21: the Skills card is now labeled Tech Stack with the Japanese statement `アイデアを技術にする。`; its numeric capability summary was replaced by a restrained microchip icon. The three fields now match the portfolio activity: Web Development, Backend & Automation, and Infrastructure. Profile and Group crops were reduced again to 1.08 and 1.20. Service stages no longer use the 2.4-second pre-scroll safety reveal and instead begin at 12% viewport intersection with a contracted bottom margin. Service imagery now uses an enlarged radial mask to conceal source-alpha boundaries. About structure, Service cards, achievement chips, CTA surfaces, and image treatments touched in this iteration were migrated from global CSS to Tailwind utilities. Production build and lint pass; browser comparison remains unavailable.
- Iteration 22: the Group image crop was reduced from 1.20 to 1.12. Social links now mount after the typing sequence and use a GSAP stagger with depth, scale, and vertical motion while respecting reduced-motion preferences. The CatHideaway asset was normalized to the cross-platform `cat-hideaway.png` path. Unused generated hero images, the legacy rocket model, and the disconnected HomeClient/Model/StarBackground/ThreeScene implementation were removed. Production build and lint pass; browser comparison remains unavailable.

## Final result

final result: blocked

Blocker: browser-rendered comparison evidence is unavailable.
