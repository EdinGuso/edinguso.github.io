// Case-study figures for edinguso.github.io.
// Extracted from the design prototype (Direction A final v2). Pure functions, no dependencies.
// figure(kind, variant, opts) returns an <svg> string. viewBox 0 0 120 72, fills its container.
// Colours come from CSS custom properties (--fg, --muted, --accent, --line), so the figure follows the theme.
// Animation is SVG SMIL (<animate>), looping. With reduce: true the figure renders its end state, no animation.
//
// Used on the site (locked):
//   01 Mapping free text to a million medical codes  -> figure(1, 'b')
//   02 Setting up a team to develop with AI coding agents -> figure(2, 'a')
//   03 ModuGPT and the GenAI tools for log analytics -> figure(3, 'a')
//   04 Showing clinicians why a model flags a patient -> figure(4, 'd')
//   Inline in 01 -> figure(1, 'e') (draft list, expert review); inline in 03 -> figure(3, 'f') (prompt from parts) and figure(3, 'e') (SmartSearch split)
//   Inline in /how-i-build -> figure(2, 'e') (phases with questions before approval) and figure(2, 'f') (findings branch off into briefs)
// 2d and 4d were added on 2026-11-10 (review-and-correct; flag-then-explain). 2d is not used: /how-i-build has no hero. The other variants (1a, 1c, 2b, 2c, 3b, 3c, 4a, 4b, 4c) were explored and not chosen; kept for reference only.

const KEBAB = { strokeWidth: 'stroke-width', strokeDasharray: 'stroke-dasharray', strokeDashoffset: 'stroke-dashoffset' };
function h(tag, props, ...children) {
  props = props || {};
  let attrs = '';
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined) continue;
    if (k === 'style') {
      const css = Object.entries(v).map(([p, val]) => p.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ':' + val).join(';');
      attrs += ` style="${css}"`;
    } else attrs += ` ${KEBAB[k] || k}="${v}"`;
  }
  const inner = children.flat().filter(Boolean).join('');
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

export function figure(kind, variant, opts = {}) {
  const reduce = !!opts.reduce;
  const fast = false;
            
    const sp = fast ? 0.45 : 1, T = d => (d * sp).toFixed(2) + 's';
    const an = p => reduce ? null : h('animate', { repeatCount: 'indefinite', ...p, dur: T(p.dur) });
    const muted = { fill: 'var(--muted)' }, acc = { fill: 'var(--accent)' }, fg = { fill: 'var(--fg)' };
    const sp3 = '.4 0 .2 1;0 0 1 1;.4 0 .2 1', sp4 = '0 0 1 1;.4 0 .2 1;0 0 1 1;.4 0 .2 1';
    const k = [];
    const v = kind + variant;
    if (v === '1a') {
      const hot = new Set([15, 28, 41, 54, 67]);
      for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
        const i = r * 12 + c, x = 5 + c * 10, y = 6 + r * 12;
        if (hot.has(i)) {
          k.push(h('circle', { cx: x, cy: y, r: 1.4, style: muted }));
          k.push(h('circle', { cx: x, cy: y, r: 1.4, style: acc, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.3;.45;.85;1', dur: 6 }),
            an({ attributeName: 'r', values: '1.4;1.4;2.8;2.8;1.4', keyTimes: '0;.3;.45;.85;1', dur: 6 })));
        } else k.push(h('circle', { cx: x, cy: y, r: 1.4, style: muted, opacity: reduce ? .25 : .9 },
          an({ attributeName: 'opacity', values: '.9;.9;.18;.18;.9', keyTimes: '0;.2;.4;.85;1', dur: 6 })));
      }
    } else if (v === '1b') {
      const lens = [30, 22, 34, 18, 26], tg = [[1, 0], [3, 1], [0, 2], [4, 3], [2, 4]];
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) k.push(h('circle', { cx: 74 + c * 9, cy: 12 + r * 12, r: 1.4, style: muted, opacity: .6 }));
      lens.forEach((l, i) => {
        const y = 12 + i * 12, [tc, tr] = tg[i], tx = 74 + tc * 9, ty = 12 + tr * 12;
        const a = (0.08 + i * 0.1).toFixed(2), b = (+a + 0.12).toFixed(2);
        k.push(h('rect', { x: 6, y: y - 1.2, width: l, height: 2.4, rx: 1.2, style: fg, opacity: .85 }));
        k.push(h('line', { x1: 6 + l + 4, y1: y, x2: tx, y2: ty, pathLength: 1, style: { stroke: 'var(--accent)' }, strokeWidth: .8, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
          an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${a};${b};.85;1`, dur: 6 })));
        k.push(h('circle', { cx: tx, cy: ty, r: 2.4, style: acc, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${b};${(+b + .03).toFixed(2)};.85;1`, dur: 6 })));
      });
    } else if (v === '1c') {
      const N = 24, hot = [0, 5, 10, 15, 20];
      for (let i = 0; i < N; i++) {
        const t = i / N * Math.PI * 2, rx = 60 + 30 * Math.cos(t), ry = 36 + 26 * Math.sin(t);
        const hi = hot.indexOf(i), t2 = hi >= 0 ? hi / 5 * Math.PI * 2 - Math.PI / 2 : t;
        const R = hi >= 0 ? 8 : 2, tx = 60 + R * Math.cos(t2), ty = 36 + R * Math.sin(t2);
        const kt = '0;.2;.5;.85;1';
        k.push(h('circle', { cx: reduce ? tx : rx, cy: reduce ? ty : ry, r: hi >= 0 ? 2.4 : 1.6, style: hi >= 0 ? acc : muted, opacity: hi >= 0 ? 1 : (reduce ? 0 : .9) },
          an({ attributeName: 'cx', values: `${rx};${rx};${tx};${tx};${rx}`, keyTimes: kt, dur: 6, calcMode: 'spline', keySplines: sp4 }),
          an({ attributeName: 'cy', values: `${ry};${ry};${ty};${ty};${ry}`, keyTimes: kt, dur: 6, calcMode: 'spline', keySplines: sp4 }),
          hi >= 0 ? null : an({ attributeName: 'opacity', values: '.9;.9;0;0;.9', keyTimes: kt, dur: 6 })));
      }
    } else if (v === '2a') {
      const sx = [24, 60, 96], scat = [[8, 30], [30, 62], [44, 36], [16, 58], [50, 66], [70, 30], [66, 58], [80, 44], [92, 34], [112, 62], [104, 40], [84, 66]];
      sx.forEach((x, s) => {
        k.push(h('rect', { x: x - 4, y: 6, width: 8, height: 8, rx: 1, style: fg }));
        for (let j = 0; j < 4; j++) {
          const [px, py] = scat[s * 4 + j], ax = x - 9 + j * 6, ay = 52;
          k.push(h('circle', { cx: reduce ? ax : px, cy: reduce ? ay : py, r: 2, style: j === 0 ? acc : muted },
            an({ attributeName: 'cx', values: `${px};${ax};${ax};${px}`, keyTimes: '0;.4;.85;1', dur: 6, calcMode: 'spline', keySplines: sp3 }),
            an({ attributeName: 'cy', values: `${py};${ay};${ay};${py}`, keyTimes: '0;.4;.85;1', dur: 6, calcMode: 'spline', keySplines: sp3 })));
        }
      });
      k.push(h('rect', { x: 10, y: 60, width: 100, height: 1, style: muted, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.4;.5;.85;1', dur: 6 })));
    } else if (v === '2b') {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) {
        const a = (0.05 + c * 0.055 + r * 0.012).toFixed(3), b = (+a + 0.04).toFixed(3);
        k.push(h('rect', { x: 6 + c * 11.2, y: 7 + r * 12, width: 7, height: 7, rx: 1.2, style: c === 0 ? acc : fg, opacity: c === 0 || reduce ? 1 : .15 },
          c === 0 ? null : an({ attributeName: 'opacity', values: '.15;.15;1;1;.15', keyTimes: `0;${a};${b};.86;1`, dur: 6 })));
      }
    } else if (v === '2c') {
      const cells = [[0, 0], [1, 0], [1, 1], [2, 2], [0, 2]];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        k.push(h('rect', { x: 10 + c * 14, y: 15 + r * 14, width: 10, height: 10, rx: 1.5, style: { fill: 'none', stroke: 'var(--line)' } }));
        k.push(h('rect', { x: 70 + c * 14, y: 15 + r * 14, width: 10, height: 10, rx: 1.5, style: { fill: 'none', stroke: 'var(--line)' } }));
      }
      cells.forEach(([c, r], i) => {
        const a = (0.15 + i * 0.1).toFixed(2), b = (+a + 0.06).toFixed(2);
        k.push(h('rect', { x: 10 + c * 14, y: 15 + r * 14, width: 10, height: 10, rx: 1.5, style: fg }));
        k.push(h('rect', { x: 70 + c * 14, y: 15 + r * 14, width: 10, height: 10, rx: 1.5, style: i === cells.length - 1 ? acc : fg, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${a};${b};.88;1`, dur: 6 })));
      });
      k.push(h('circle', { cx: 56, cy: 36, r: 2, style: acc, opacity: reduce ? 0 : 1 },
        an({ attributeName: 'cx', values: '52;68;52', keyTimes: '0;.5;1', dur: 1.2 })));
    } else if (v === '3a') {
      const len = [70, 42, 88, 56, 30, 76, 50, 64], lines = [];
      for (let rep = 0; rep < 2; rep++) len.forEach((l, i) => {
        const y = rep * 80 + i * 10 + 5, hot = i === 2 || i === 6;
        lines.push(h('rect', { x: 10, y: y - 1, width: l, height: 2, rx: 1, style: hot ? acc : muted, opacity: hot ? 1 : .55 }));
        if (hot) lines.push(h('circle', { cx: l + 18, cy: y, r: 2, style: acc }));
      });
      k.push(h('g', null, ...lines, reduce ? null : h('animateTransform', { attributeName: 'transform', type: 'translate', from: '0 0', to: '0 -80', dur: T(9), repeatCount: 'indefinite' })));
    } else if (v === '3b') {
      const hs = [12, 16, 10, 14, 18, 12, 9, 15, 13, 11, 17, 14, 44, 16, 12, 10, 15, 13, 11, 14];
      hs.forEach((ht, i) => {
        const x = 6 + i * 5.6, a = (0.02 + i * 0.022).toFixed(3), b = (+a + 0.06).toFixed(3), spike = i === 12;
        k.push(h('rect', { x, y: reduce ? 66 - ht : 66, width: 3.2, height: reduce ? ht : 0, rx: .8, style: spike ? acc : muted, opacity: spike ? 1 : .7 },
          an({ attributeName: 'height', values: `0;0;${ht};${ht};0`, keyTimes: `0;${a};${b};.88;1`, dur: 6 }),
          an({ attributeName: 'y', values: `66;66;${66 - ht};${66 - ht};66`, keyTimes: `0;${a};${b};.88;1`, dur: 6 })));
      });
      k.push(h('circle', { cx: 6 + 12 * 5.6 + 1.6, cy: 16, r: 2.4, style: acc, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.6;.64;.88;1', dur: 6 })));
    } else if (v === '3c') {
      const ws = [80, 62, 92, 54, 74, 86, 48, 70, 60];
      const kt = '0;.22;.38;.5;.64;.88;1';
      ws.forEach((w, i) => {
        const y0 = 8 + i * 7, g = Math.floor(i / 3), yg = 20 + g * 16;
        k.push(h('rect', { x: 14, y: (reduce ? yg : y0) - 1, width: w, height: 2, rx: 1, style: fg, opacity: .7 },
          an({ attributeName: 'y', values: `${y0 - 1};${y0 - 1};${yg - 1};${yg - 1};35;35;${y0 - 1}`, keyTimes: kt, dur: 7, calcMode: 'spline', keySplines: '0 0 1 1;.4 0 .2 1;0 0 1 1;.4 0 .2 1;0 0 1 1;.4 0 .2 1' }),
          an({ attributeName: 'width', values: `${w};${w};56;56;92;92;${w}`, keyTimes: kt, dur: 7 }),
          an({ attributeName: 'opacity', values: '.7;.7;.7;.7;0;0;.7', keyTimes: kt, dur: 7 })));
      });
      k.push(h('rect', { x: 14, y: 34.5, width: 92, height: 3, rx: 1.5, style: acc, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.6;.66;.88;1', dur: 7 })));
    } else if (v === '4a') {
      [26, 60, 94].forEach((x, c) => {
        [0, 1, 2].forEach(s => {
          const a = (0.06 + (c * 3 + s) * 0.07).toFixed(2), b = (+a + 0.05).toFixed(2);
          k.push(h('rect', { x: x - 10, y: 50 - s * 13, width: 20, height: 10, rx: 1.5, style: s === 2 ? acc : fg, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${a};${b};.9;1`, dur: 5 })));
        });
        k.push(h('rect', { x: x - 10, y: 64, width: 20, height: 1.5, style: muted, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.72;.76;.9;1', dur: 5 })));
      });
    } else if (v === '4b') {
      const hs = [18, 30, 24, 40, 28, 34];
      [8, 66].forEach((x0, set) => {
        hs.forEach((ht, i) => {
          const a = (0.05 + set * 0.32 + i * 0.04).toFixed(2), b = (+a + 0.06).toFixed(2);
          k.push(h('rect', { x: x0 + i * 8, y: reduce ? 60 - ht : 60, width: 5, height: reduce ? ht : 0, rx: 1, style: fg, opacity: .85 },
            an({ attributeName: 'height', values: `0;0;${ht};${ht};0`, keyTimes: `0;${a};${b};.88;1`, dur: 6 }),
            an({ attributeName: 'y', values: `60;60;${60 - ht};${60 - ht};60`, keyTimes: `0;${a};${b};.88;1`, dur: 6 })));
        });
      });
      k.push(h('rect', { x: 8, y: 64, width: 104, height: 1.5, style: acc, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.7;.74;.88;1', dur: 6 })));
    } else if (v === '2d') {
      // Agent writes five lines; I review them one by one, reject and rewrite line 3; a baseline marks the merge.
      const ws = [60, 44, 70, 38, 54], ys = [10, 22, 34, 46, 58], f = x => x.toFixed(3);
      const a = ws.map((_, i) => .04 + i * .07), b = a.map(x => x + .06), r = [.46, .52, .58, .74, .8];
      ws.forEach((w, i) => {
        const y = ys[i] - 1.2;
        if (i !== 2) {
          if (!reduce) k.push(h('rect', { x: 22, y, width: 0, height: 2.4, rx: 1.2, style: muted, opacity: .6 },
            an({ attributeName: 'width', values: `0;0;${w};${w};0`, keyTimes: `0;${f(a[i])};${f(b[i])};.95;1`, dur: 9 })));
          k.push(h('rect', { x: 22, y, width: w, height: 2.4, rx: 1.2, style: fg, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(r[i] + .02)};${f(r[i] + .03)};.95;1`, dur: 9 })));
        } else {
          if (!reduce) {
            k.push(h('rect', { x: 22, y, width: 0, height: 2.4, rx: 1.2, style: muted, opacity: .6 },
              an({ attributeName: 'width', values: `0;0;${w};${w};0;0`, keyTimes: `0;${f(a[i])};${f(b[i])};.63;.66;1`, dur: 9 })));
            k.push(h('rect', { x: 22, y, width: w, height: 2.4, rx: 1.2, style: acc, opacity: 0 },
              an({ attributeName: 'opacity', values: '0;0;1;1;0;0', keyTimes: '0;.6;.61;.63;.64;1', dur: 9 }),
              an({ attributeName: 'width', values: `${w};${w};0;0`, keyTimes: '0;.63;.66;1', dur: 9 })));
          }
          k.push(h('rect', { x: 22, y, width: reduce ? 50 : 0, height: 2.4, rx: 1.2, style: fg },
            an({ attributeName: 'width', values: '0;0;50;50;0', keyTimes: '0;.66;.7;.95;1', dur: 9 })));
        }
      });
      if (!reduce) {
        const sq = ys.map(y => y - 3);
        k.push(h('rect', { x: 9, y: sq[0], width: 6, height: 6, rx: 1.2, style: fg },
          an({ attributeName: 'y', values: `${sq[0]};${sq[0]};${sq[1]};${sq[2]};${sq[3]};${sq[4]};${sq[4]}`, keyTimes: `0;${a.map(f).join(';')};1`, dur: 9 }),
          an({ attributeName: 'opacity', values: '1;1;0;0', keyTimes: '0;.4;.42;1', dur: 9 })));
        k.push(h('rect', { x: 9, y: sq[0], width: 6, height: 6, rx: 1.2, style: { fill: 'none', stroke: 'var(--accent)' }, strokeWidth: 1, opacity: 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0;0', keyTimes: '0;.44;.46;.84;.86;1', dur: 9 }),
          an({ attributeName: 'y', values: `${sq[0]};${sq[0]};${sq[1]};${sq[2]};${sq[2]};${sq[3]};${sq[4]};${sq[4]}`, keyTimes: '0;.46;.52;.58;.7;.74;.8;1', dur: 9 })));
      }
      k.push(h('rect', { x: 22, y: 66, width: reduce ? 70 : 0, height: 1.5, style: acc },
        an({ attributeName: 'width', values: '0;0;70;70;0', keyTimes: '0;.86;.9;.95;1', dur: 9 })));
    } else if (v === '4d') {
      // A grid of patients; one is flagged; bars grow beside it for what drove the flag, the two largest in accent.
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
        const x = 8 + c * 9, y = 12 + r * 12;
        k.push(h('circle', { cx: x, cy: y, r: 1.6, style: muted, opacity: .55 }));
        if (r === 2 && c === 3) k.push(h('circle', { cx: x, cy: y, r: reduce ? 3 : 1.6, style: acc, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.12;.16;.9;1', dur: 7 }),
          an({ attributeName: 'r', values: '1.6;1.6;3;3;1.6', keyTimes: '0;.12;.18;.9;1', dur: 7 })));
      }
      k.push(h('line', { x1: 40, y1: 36, x2: 60, y2: 36, pathLength: 1, style: { stroke: 'var(--accent)' }, strokeWidth: .8, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
        an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: '0;.18;.26;.9;1', dur: 7 })));
      [44, 32, 22, 14, 8].forEach((w, i) => {
        const y = 16 + i * 10, a = (.28 + i * .07).toFixed(2), b = (.36 + i * .07).toFixed(2);
        k.push(h('rect', { x: 64, y: y - 1.6, width: reduce ? w : 0, height: 3.2, rx: 1, style: i < 2 ? acc : fg, opacity: i < 2 ? 1 : .7 },
          an({ attributeName: 'width', values: `0;0;${w};${w};0`, keyTimes: `0;${a};${b};.9;1`, dur: 7 })));
      });
    } else if (v === '1e') {
      // A free-text concept on the left drafts a code list; an expert reviews it row by row, keeps four and drops one.
      const ws = [40, 28, 46, 34, 24], ys = [10, 23, 36, 49, 62], f = x => x.toFixed(3), D = 9;
      const a = ws.map((_, i) => .14 + i * .05), r = [.46, .52, .58, .64, .7];
      k.push(h('rect', { x: 6, y: 34.5, width: 26, height: 3, rx: 1.5, style: fg }));
      // One mapping line from the concept to each drafted code; the dropped code's line fades with it.
      ys.forEach((y, i) => {
        const drop = i === 2, s0 = f(a[i] - .04), s1 = f(a[i] + .01);
        k.push(h('line', { x1: 35, y1: 36, x2: 48.5, y2: y, pathLength: 1, style: { stroke: 'var(--accent)' }, strokeWidth: .8, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1, opacity: reduce && drop ? .2 : .9 },
          an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${s0};${s1};.94;1`, dur: D }),
          drop ? an({ attributeName: 'opacity', values: '.9;.9;.2;.2;.9', keyTimes: `0;${f(r[i])};${f(r[i] + .03)};.94;1`, dur: D }) : null));
      });
      ws.forEach((w, i) => {
        const y = ys[i], drop = i === 2;
        k.push(h('circle', { cx: 52, cy: y, r: 1.6, style: muted, opacity: reduce ? (drop ? .2 : .9) : 0 },
          an({ attributeName: 'opacity', values: drop ? '0;0;.9;.9;.2;.2;0' : '0;0;.9;.9;0', keyTimes: drop ? `0;${f(a[i])};${f(a[i] + .04)};${f(r[i])};${f(r[i] + .03)};.94;1` : `0;${f(a[i])};${f(a[i] + .04)};.94;1`, dur: D })));
        k.push(h('rect', { x: 57, y: y - 1.2, width: reduce ? w : 0, height: 2.4, rx: 1.2, style: muted, opacity: reduce ? (drop ? .2 : 0) : .6 },
          an({ attributeName: 'width', values: `0;0;${w};${w};0`, keyTimes: `0;${f(a[i])};${f(a[i] + .05)};.94;1`, dur: D }),
          drop ? an({ attributeName: 'opacity', values: '.6;.6;.2;.2;.6', keyTimes: `0;${f(r[i])};${f(r[i] + .03)};.94;1`, dur: D }) : null));
        if (!drop) {
          k.push(h('rect', { x: 57, y: y - 1.2, width: w, height: 2.4, rx: 1.2, style: fg, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(r[i])};${f(r[i] + .02)};.94;1`, dur: D })));
          k.push(h('rect', { x: 108, y: y - 2.5, width: 5, height: 5, rx: 1, style: fg, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(r[i])};${f(r[i] + .02)};.94;1`, dur: D })));
        } else {
          k.push(h('rect', { x: 108, y: y - 2.5, width: 5, height: 5, rx: 1, style: { fill: 'none', stroke: 'var(--accent)' }, strokeWidth: .8, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(r[i])};${f(r[i] + .02)};.94;1`, dur: D })));
        }
      });
      if (!reduce) k.push(h('rect', { x: 106, y: ys[0] - 4.5, width: 9, height: 9, rx: 1.6, style: { fill: 'none', stroke: 'var(--accent)' }, strokeWidth: 1, opacity: 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0;0', keyTimes: '0;.42;.44;.74;.76;1', dur: D }),
        an({ attributeName: 'y', values: ys.map(y => y - 4.5).concat([ys[4] - 4.5]).join(';').replace(/^/, `${ys[0] - 4.5};`), keyTimes: `0;${r.map(f).join(';')};1`, dur: D })));
    } else if (v === '3e') {
      // A question splits into an exact filter (structured) and a topic (semantic); both searches meet in one result.
      const D = 8, draw = (x1, y1, x2, y2, a, b, stroke) => h('line', { x1, y1, x2, y2, pathLength: 1, style: { stroke }, strokeWidth: .8, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
        an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${a};${b};.92;1`, dur: D }));
      const show = (el, a, b) => { el.push(an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${a};${b};.92;1`, dur: D })); return el; };
      k.push(h('rect', { x: 4, y: 34.5, width: 26, height: 3, rx: 1.5, style: fg }));
      k.push(draw(32, 36, 44, 18, .06, .16, 'var(--accent)'));
      k.push(draw(32, 36, 44, 54, .06, .16, 'var(--muted)'));
      [0, 1, 2].forEach(j => {
        const a = (.18 + j * .04).toFixed(2), b = (+a + .03).toFixed(2);
        k.push(h('rect', { x: 48 + j * 8, y: 15, width: 6, height: 6, rx: 1, style: fg, opacity: reduce ? 1 : 0 }, ...show([], a, b)));
      });
      [[50, 50], [56, 57], [62, 51], [58, 46], [66, 57], [70, 49]].forEach(([cx, cy], j) => {
        const a = (.18 + j * .03).toFixed(2), b = (+a + .03).toFixed(2), hot = j === 3;
        k.push(h('circle', { cx, cy, r: hot ? 2.2 : 1.6, style: hot ? acc : muted, opacity: reduce ? 1 : 0 }, ...show([], a, b)));
      });
      k.push(draw(76, 18, 88, 36, .4, .5, 'var(--accent)'));
      k.push(draw(76, 54, 88, 36, .4, .5, 'var(--muted)'));
      [[22, 30, 1], [16, 36, 0], [20, 42, 0]].forEach(([w, y, hot], j) => {
        const a = (.52 + j * .04).toFixed(2), b = (+a + .03).toFixed(2);
        k.push(h('rect', { x: 92, y: y - 1.2, width: w, height: 2.4, rx: 1.2, style: hot ? acc : fg, opacity: reduce ? 1 : 0 }, ...show([], a, b)));
      });
    } else if (v === '3f') {
      // Reusable prompt parts on the left assemble into one tool's prompt, then the same parts build a second tool's.
      const D = 9, f = x => x.toFixed(3), W = 24, H = 7;
      const parts = [{ style: fg, op: .85 }, { style: muted, op: .8 }, { style: acc, op: 1 }, { style: fg, op: .45 }];
      const sy = [10, 24, 38, 52], ty = [14, 24, 34];
      parts.forEach((p, j) => k.push(h('rect', { x: 8, y: sy[j], width: W, height: H, rx: 1.5, style: p.style, opacity: p.op })));
      const tools = [{ x: 52, use: [0, 1, 2], t0: .06 }, { x: 88, use: [0, 1, 3], t0: .46 }];
      tools.forEach(({ x, use, t0 }) => {
        use.forEach((j, n) => {
          const s0 = t0 + n * .08, s1 = s0 + .08, p = parts[j];
          k.push(h('rect', { x: reduce ? x : 8, y: reduce ? ty[n] : sy[j], width: W, height: H, rx: 1.5, style: p.style, opacity: reduce ? p.op : 0 },
            an({ attributeName: 'opacity', values: `0;0;${p.op};${p.op};0`, keyTimes: `0;${f(s0)};${f(s0 + .01)};.94;1`, dur: D }),
            an({ attributeName: 'x', values: `8;8;${x};${x};8`, keyTimes: `0;${f(s0)};${f(s1)};.94;1`, dur: D, calcMode: 'spline', keySplines: sp4 }),
            an({ attributeName: 'y', values: `${sy[j]};${sy[j]};${ty[n]};${ty[n]};${sy[j]}`, keyTimes: `0;${f(s0)};${f(s1)};.94;1`, dur: D, calcMode: 'spline', keySplines: sp4 })));
        });
        const fa = t0 + .28;
        k.push(h('rect', { x: x - 3, y: 10.5, width: W + 6, height: 34, rx: 2.5, style: { fill: 'none', stroke: 'var(--muted)' }, strokeWidth: .6, opacity: reduce ? .8 : 0 },
          an({ attributeName: 'opacity', values: '0;0;.8;.8;0', keyTimes: `0;${f(fa)};${f(fa + .03)};.94;1`, dur: D })));
        k.push(h('rect', { x: x + 1, y: 55, width: W - 6, height: 2.4, rx: 1.2, style: fg, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(fa + .05)};${f(fa + .08)};.94;1`, dur: D })));
      });
    } else if (v === '2e') {
      // Four phases in a row. In each of the first three, a question travels up its arc to me (the lane at the
      // top), the lane flashes where I answer, the answer comes back down and the phase is done. In the last
      // phase the approval comes down from me as a straight line, and only then does the plan turn accent.
      const D = 10, f = x => x.toFixed(3), xs = [16, 45, 74, 103], y = 54, L = 12, t = [.04, .23, .42, .62];
      const top = y - 7, c = ((L - .25 * top) / .75).toFixed(2);
      k.push(h('rect', { x: 6, y: L - .5, width: 108, height: 1, rx: .5, style: muted, opacity: .5 }));
      xs.forEach((x, i) => {
        k.push(h('rect', { x: x - 5, y: y - 5, width: 10, height: 10, rx: 2, style: { fill: 'none', stroke: 'var(--muted)' }, strokeWidth: .8 }));
        if (i < 3) {
          const d = `M${x - 4} ${top} C${x - 8} ${c} ${x + 8} ${c} ${x + 4} ${top}`, s = t[i];
          k.push(h('path', { d, style: { fill: 'none', stroke: 'var(--muted)' }, strokeWidth: .7, opacity: .55 }));
          if (!reduce) {
            k.push(h('circle', { cx: 0, cy: 0, r: 2, style: acc, opacity: 0 },
              an({ attributeName: 'opacity', values: '0;0;1;1;0;0', keyTimes: `0;${f(s)};${f(s + .01)};${f(s + .12)};${f(s + .13)};1`, dur: D }),
              h('animateMotion', { path: d, dur: T(D), repeatCount: 'indefinite', keyPoints: '0;0;1;1', keyTimes: `0;${f(s + .01)};${f(s + .12)};1`, calcMode: 'linear' })));
            k.push(h('rect', { x: x - 6, y: L - 1, width: 12, height: 2, rx: 1, style: acc, opacity: 0 },
              an({ attributeName: 'opacity', values: '0;0;1;1;0;0', keyTimes: `0;${f(s + .055)};${f(s + .065)};${f(s + .08)};${f(s + .09)};1`, dur: D })));
          }
          k.push(h('rect', { x: x - 5, y: y - 5, width: 10, height: 10, rx: 2, style: fg, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(s + .13)};${f(s + .14)};.94;1`, dur: D })));
          k.push(h('line', { x1: x + 7, y1: y, x2: xs[i + 1] - 7, y2: y, pathLength: 1, style: { stroke: 'var(--fg)' }, strokeWidth: .9, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1, opacity: .7 },
            an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${f(s + .14)};${f(s + .19)};.94;1`, dur: D })));
        } else {
          const s = t[i];
          k.push(h('line', { x1: x, y1: L + 1, x2: x, y2: y - 7, pathLength: 1, style: { stroke: 'var(--accent)' }, strokeWidth: .9, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
            an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${f(s)};${f(s + .06)};.94;1`, dur: D })));
          k.push(h('rect', { x: x - 5, y: y - 5, width: 10, height: 10, rx: 2, style: acc, opacity: reduce ? 1 : 0 },
            an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(s + .07)};${f(s + .08)};.94;1`, dur: D })));
        }
      });
    } else if (v === '2f') {
      // The main task runs as one line to the end; two findings along the way branch off into brief cards
      // for later, and the main line keeps going without a pause.
      const D = 9, f = x => x.toFixed(3), x0 = 8, x1 = 104, y = 24, t0 = .04, t1 = .7;
      const at = x => t0 + (x - x0) / (x1 - x0) * (t1 - t0);
      k.push(h('rect', { x: x0, y: y - .8, width: reduce ? x1 - x0 : 0, height: 1.6, rx: .8, style: fg },
        an({ attributeName: 'width', values: `0;0;${x1 - x0};${x1 - x0};0`, keyTimes: `0;${t0};${t1};.94;1`, dur: D })));
      k.push(h('rect', { x: x1 + 3, y: y - 3.5, width: 7, height: 7, rx: 1.2, style: fg, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(t1)};${f(t1 + .02)};.94;1`, dur: D })));
      [36, 70].forEach(x => {
        const s = at(x), cx = x + 10, cy = 50;
        k.push(h('circle', { cx: x, cy: y, r: 2, style: acc, opacity: reduce ? 1 : 0 },
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(s)};${f(s + .01)};.94;1`, dur: D })));
        k.push(h('line', { x1: x, y1: y + 2.5, x2: cx, y2: cy - 6.5, pathLength: 1, style: { stroke: 'var(--accent)' }, strokeWidth: .8, strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
          an({ attributeName: 'stroke-dashoffset', values: '1;1;0;0;1', keyTimes: `0;${f(s + .01)};${f(s + .06)};.94;1`, dur: D })));
        const card = [h('rect', { x: cx - 10, y: cy - 6, width: 20, height: 13, rx: 1.8, style: { fill: 'none', stroke: 'var(--muted)' }, strokeWidth: .7 }),
          h('rect', { x: cx - 7, y: cy - 2.6, width: 12, height: 1.6, rx: .8, style: fg, opacity: .8 }),
          h('rect', { x: cx - 7, y: cy + 1.4, width: 8, height: 1.6, rx: .8, style: muted, opacity: .8 })];
        k.push(h('g', { opacity: reduce ? 1 : 0 }, ...card,
          an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: `0;${f(s + .06)};${f(s + .08)};.94;1`, dur: D })));
      });
    } else if (v === '4c') {
      const tg = [[44, 20], [62, 20], [44, 38], [62, 38]], st = [[30, 8], [80, 14], [36, 50], [74, 46]];
      const kt = '0;.15;.5;.85;1';
      tg.forEach(([tx, ty], i) => {
        const [sx, sy] = st[i];
        k.push(h('rect', { x: reduce ? tx : sx, y: reduce ? ty : sy, width: 14, height: 14, rx: 2, style: fg, opacity: .85 },
          an({ attributeName: 'x', values: `${sx};${sx};${tx};${tx};${sx}`, keyTimes: kt, dur: 6, calcMode: 'spline', keySplines: sp4 }),
          an({ attributeName: 'y', values: `${sy};${sy};${ty};${ty};${sy}`, keyTimes: kt, dur: 6, calcMode: 'spline', keySplines: sp4 })));
      });
      k.push(h('rect', { x: 40, y: 16, width: 40, height: 40, rx: 4, style: { fill: 'none', stroke: 'var(--accent)' }, strokeWidth: 1.2, opacity: reduce ? 1 : 0 },
        an({ attributeName: 'opacity', values: '0;0;1;1;0', keyTimes: '0;.52;.58;.85;1', dur: 6 })));
    }
    return (h('svg', { viewBox: '0 0 120 72', width: '100%', height: '100%', 'aria-hidden': 'true', 'data-fig': '1', xmlns: 'http://www.w3.org/2000/svg', style: { display: 'block', overflow: 'hidden' } }, ...k));
}
