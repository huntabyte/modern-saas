import { json } from '@sveltejs/kit';
import { deleteArticle } from '$lib/api';
import {  currentUser } from '$lib/stores.js';
export async function POST({ request, locals }) {
  const currentUserValue = currentUser; 
  const { slug } = await request.json();
  const result = await deleteArticle(slug, currentUserValue);
  return json(result);
}
