import type { APIRoute } from 'astro';
import p from '../data/profile.json';

export const GET: APIRoute = ({ site }) => {
  const abs = (href: string) => (href.startsWith('/') ? new URL(href, site).href : href);
  const lines = [
    `# ${p.name}`,
    '',
    `> ${p.kicker}. ${p.intro.lead} ${p.intro.rest}`,
    '',
    '## Links',
    `- [Website](${p.links.site})`,
    `- [LinkedIn](${p.links.linkedin})`,
    `- [GitHub](${p.links.github})`,
    `- [CV (PDF)](${abs(p.links.cv)})`,
    '',
    '## Selected work',
    ...p.caseStudies.map((c) => `- [${c.title}](${abs(`/selected-work/${c.num}/`)}): ${c.summary}`),
    `- [${p.howIBuild.title}](${abs('/how-i-build/')}): ${p.howIBuild.line}`,
    '',
    '## Publications and talks',
    ...p.publications.map((r) => `- [${r.text}](${r.href})`),
    '',
    '## Personal projects',
    ...p.projects.map((r) => (r.href ? `- [${r.title}](${r.href}): ${r.line}` : `- ${r.title} (private): ${r.line}`)),
    '',
    '## Background',
    ...p.background.map((b) => `- ${b.dates}: ${b.text}`),
    '',
    '## Outside work',
    // "with the workout app above" only makes sense on the page, where the app row sits above.
    ...p.outsideWork.map((o) => `- ${o.replace(/, with the workout app above$/, '')}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
