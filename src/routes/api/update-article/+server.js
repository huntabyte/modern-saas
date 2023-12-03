import { json } from '@sveltejs/kit';
import { updateArticle } from '$lib/api';
import {  currentUser } from '$lib/stores.js';
export async function POST({ request, locals }) {
  const currentUser1 = currentUser;
  const { slug, title, content, teaser } = await request.json();
  await updateArticle(slug, title, content, teaser, currentUser1);
  return json({ slug, status: 'ok' });
}
