import { getArticleBySlug, getNextArticle } from '$lib/api';

export async function load({ params, locals }) {

  const data = await getArticleBySlug(params.slug);
  const nextArticle = await getNextArticle(params.slug);
  const articles = nextArticle ? [nextArticle] : [];
  return {
    ...data,
    articles
  };
}