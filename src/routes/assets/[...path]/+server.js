import { getAsset } from '$lib/api';
import { error } from '@sveltejs/kit';

export const GET = async ({ params, headers }) => {
  const path = params.path;
  const file = await getAsset(path);

  if (!file || !file.data) {
    throw error(404, 'Asset not found');
  }

  // Set response headers
  const responseHeaders = new Headers({
    'Content-Type': file.mimeType,
    'Content-Length': file.size.toString(),
    'Last-Modified': new Date(file.lastModified).toUTCString(),
    'Cache-Control': 'public, max-age=600',
  });

  return {
    status: 200,
    headers: responseHeaders,
    body: file.data,
  };
};
