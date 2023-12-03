import { json } from '@sveltejs/kit';
import { createOrUpdatePage } from '$lib/api';
import {  currentUser } from '$lib/stores.js';


export async function POST({ request, locals }) {
  const currentUserValue = currentUser; 
  const { pageId, page } = await request.json();
  await createOrUpdatePage(pageId, page, currentUserValue);
  return json({ pageId, status: 'ok' });
}
