import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
  author?: string;
  cover?: string;
  keywords?: string[];
  draft?: boolean;
  content: string;
  rank?: number;
  faqs?: { question: string, answer: string }[];
};

export type Airport = {
  slug: string;
  name: string;
  officialUrl?: string;
  description: string;
  category?: string;
  tags?: string[];
  logo?: string;
  cover?: string;
  updated?: string;
  rating?: number;
  features?: string[];
  keywords?: string[];
  content: string;
  rank?: number;
  faqs?: { question: string, answer: string }[];
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  updated?: string;
  relatedArticles?: string[];
  content: string;
  rank?: number;
  faqs?: { question: string, answer: string }[];
};

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs(type: 'blog' | 'airports' | 'topics') {
  const targetDir = path.join(contentDirectory, type);
  if (!fs.existsSync(targetDir)) return [];
  return fs.readdirSync(targetDir).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(type: 'blog' | 'airports' | 'topics', slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, type, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: any = {};

  // Ensure rank is always fetched for internal sorting even if not explicitly requested
  const fieldsToFetch = Array.from(new Set([...fields, 'rank']));

  fieldsToFetch.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    } else if (field === 'content') {
      items[field] = content;
    } else if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(type: 'blog' | 'airports' | 'topics', fields: string[] = []) {
  const slugs = getPostSlugs(type);
  const posts = slugs
    .map((slug) => getPostBySlug(type, slug, fields))
    .sort((post1, post2) => {
      if (typeof post1.rank !== 'undefined' && typeof post2.rank !== 'undefined') {
        return post1.rank - post2.rank;
      }
      const date1 = post1.date || post1.updated || '';
      const date2 = post2.date || post2.updated || '';
      return date1 > date2 ? -1 : 1;
    });
  return posts;
}
