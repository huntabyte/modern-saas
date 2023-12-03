import slugify from 'slugify';
import { SHORTCUTS } from './constants';
// import Database from 'better-sqlite3';
import { nanoid } from '$lib/util';
// import { DB_PATH, ADMIN_PASSWORD } from '$env/static/private';
import { Blob } from 'node:buffer';
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient
const prisma = new PrismaClient();

import {supabase} from "$lib/server/supabase"

/**
 * Creates a new article
 */
// Import PrismaClient


/**
 * Creates a new article
 */
export async function createArticle(title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  let slug = slugify(title, {
    lower: true,
    strict: true,
  });

  // If slug is already used, we add a unique postfix
  const existingArticle = await prisma.article.findUnique({
    where: { slug },
  });

  if (existingArticle) {
    slug = slug + '-' + nanoid();
  }

  const newArticle = await prisma.article.create({
    data: {
      slug,
      title,
      content,
      teaser,
      published_at: new Date().toISOString(),
    },
    select: { slug: true, created_at: true },
  });

  return newArticle;
}


/**
 * We automatically extract a teaser text from the document's content.
 */
export async function updateArticle(slug, title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const updatedArticle = await prisma.article.update({
    where: { slug },
    data: {
      title,
      content,
      teaser,
      updated_at: new Date().toISOString(),
    },
    select: { slug: true, updated_at: true },
  });

  return updatedArticle;
}

/*
  This can be replaced with any user-based authentication system
*/


/*
  Log out of the admin session ...
*/


/**
 * List all available articles (newest first)
 */
export async function getArticles(currentUser) {
  let articles;

  if (currentUser) {
    // When logged in, show both drafts and published articles
    articles = await prisma.article.findMany({
      orderBy: { modified_at: 'desc' },
      select: { slug: true, title: true, content: true, teaser: true, published_at: true, updated_at: true, created_at: true },
    });
  } else {
    articles = await prisma.article.findMany({
      where: { published_at: { not: null } },
      orderBy: { published_at: 'desc' },
      select: { slug: true, title: true, content: true, teaser: true, published_at: true, updated_at: true, created_at: true },
    });
  }

  return articles;
}

/**
 * Given a slug, determine article to "read next"
 */
export async function getNextArticle(slug) {
  const previousPublished = await prisma.article.findFirst({
    where: {
      published_at: { lt: new Date() },
      slug: { equals: slug },
    },
    orderBy: { published_at: 'desc' },
  });

  const latestArticle = await prisma.article.findFirst({
    where: {
      slug: { not: slug },
    },
    orderBy: { published_at: 'desc' },
  });

  if (!previousPublished && !latestArticle) {
    return null;
  }

  const result = await prisma.$queryRaw`
    SELECT title, teaser, slug, published_at
    FROM (
      SELECT ${previousPublished?.title || ''} as title, ${previousPublished?.teaser || ''} as teaser, ${previousPublished?.slug || ''} as slug, ${previousPublished?.published_at} as published_at
      UNION
      SELECT ${latestArticle?.title || ''} as title, ${latestArticle?.teaser || ''} as teaser, ${latestArticle?.slug || ''} as slug, ${latestArticle?.published_at} as published_at
    ) AS subquery
    WHERE published_at IS NOT NULL -- Exclude rows with empty published_at
    ORDER BY published_at ASC
    LIMIT 1;
  `;

  return result[0];
}


/**
 * Search within all searchable items (including articles and website sections)
 */
export async function search(q, currentUser) {
  let articles;

  if (currentUser) {
    articles = await prisma.article.findMany({
      where: {
        title: { contains: q, mode: 'insensitive' },
      },
      orderBy: { modified_at: 'desc' },
      select: { slug: true, title: true, published_at: true, updated_at: true, created_at: true },
    });
  } else {
    articles = await prisma.article.findMany({
      where: {
        title: { contains: q, mode: 'insensitive' },
        published_at: { not: null },
      },
      orderBy: { modified_at: 'desc' },
      select: { slug: true, title: true, published_at: true, updated_at: true, created_at: true },
    });
  }

  const results = articles.map((article) => ({
    name: article.title,
    url: `/blog/${article.slug}`,
    modified_at: article.published_at || article.updated_at || article.created_at,
  }));

  // Also include predefined shortcuts in search
  SHORTCUTS.forEach((shortcut) => {
    if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
      results.push(shortcut);
    }
  });

  return results;
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  return article;
}

/**
 * Remove the entire article
 */
export async function deleteArticle(slug, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const result = await prisma.article.delete({
    where: { slug },
  });

  return result;
}





/**
 * Update the page
 */
export async function createOrUpdatePage(page_id, page, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const existingPage = await prisma.page.findUnique({
    where: { page_id },
  });

  if (existingPage) {
    return prisma.page.update({
      where: { page_id },
      data: {
        data: JSON.stringify(page),
        updated_at: new Date().toISOString(),
      },
      select: { page_id: true },
    });
  } else {
    return prisma.page.create({
      data: {
        page_id,
        data: JSON.stringify(page),
        updated_at: new Date().toISOString(),
      },
      select: { page_id: true },
    });
  }
}

/**
 * E.g. getPage("home") gets all dynamic data for the home page
 */
export async function getPage(page_id) {
  const page = await prisma.page.findUnique({
    where: { page_id },
    select: { data: true },
  });

  if (page?.data) {
    return JSON.parse(page.data);
  } else {
    return null;
  }
}

/**
 * We can count all kinds of things with this.
 */
export async function createOrUpdateCounter(counter_id) {
  return prisma.$transaction(async (prisma) => {
    const existingCounter = await prisma.counter.findUnique({
      where: { counter_id },
    });

    if (existingCounter) {
      return prisma.counter.update({
        where: { counter_id },
        data: { count: { increment: 1 } },
        select: { count: true },
      });
    } else {
      return prisma.counter.create({
        data: {
          counter_id,
          count: 1,
        },
        select: { count: true },
      });
    }
  });
}

// asset_id is a string and has the form path
export async function storeAsset(asset_id, file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload the file to the Supabase bucket
  const { data, error } = await supabase.storage.from('quill_files').upload(`kelli/${asset_id}`, buffer, {
      metadata: {
        mime_type: file.type,
        size: file.size,
      },
    });

  if (error) {
    console.error('Error uploading file to Supabase bucket:', error);
    throw error;
  }

  // Update or insert the record in the database using Prisma
  await prisma.asset.upsert({
    where: { asset_id },
    update: {
      mime_type: file.type,
      updated_at: new Date().toISOString(),
      size: file.size,
      data: buffer,
    },
    create: {
      asset_id,
      mime_type: file.type,
      updated_at: new Date().toISOString(),
      size: file.size,
      data: buffer,
    },
  });
}


export async function getAsset(asset_id) {
  const asset = await prisma.asset.findUnique({
    where: { asset_id },
    select: { asset_id: true, mime_type: true, updated_at: true, size: true, data: true },
  });

  if (!asset) {
    return null;
  }

  const filename = asset.asset_id.split('/').slice(-1)[0]; // Get the last part of the split array
const supabaseStorageURL = "https://yplejatygdmrnsaocsfk.supabase.co/storage/v1/object/public/quill_files"
  return {
    filename,
    mimeType: asset.mime_type,
    lastModified: asset.updated_at,
    size: asset.size,
    data: new Blob([Buffer.from(asset.data)], { type: asset.mime_type }),
    url: `${supabaseStorageURL}/kelli/${asset_id}`, // Adjust the folder path as needed
  };
}

/**
 * Helpers
 */
function __getDateTimeMinutesAfter(minutes) {
  return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
import {currentUser} from "$lib/stores"
export async function getCurrentUser(session_id) {
  const session = await event.locals.getSession();

  if (session) {   
    return { name: 'Admin' };
  } else {
    return null;
  }
}
