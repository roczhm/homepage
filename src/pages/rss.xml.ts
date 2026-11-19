import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const base = (site ?? new URL('https://example.com')).toString().replace(/\/$/, '');

  const items = posts
    .map((post) => {
      const url = `${base}/posts/${post.id}`;
      return `  <item>
    <title>${esc(post.data.title)}</title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${post.data.date.toUTCString()}</pubDate>
    <description>${esc(post.data.description ?? '')}</description>
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${esc(SITE_TITLE)}</title>
  <link>${base}</link>
  <description>${esc(SITE_DESCRIPTION)}</description>
  <language>zh-CN</language>
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
