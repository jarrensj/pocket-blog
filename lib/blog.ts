import { createClient } from '@supabase/supabase-js';
import { BlogPost } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('publishDate', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return data;
}

export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .order('slug', { ascending: true });
  if (error) throw error;
  return data?.map(post => post.slug) || [];
} 