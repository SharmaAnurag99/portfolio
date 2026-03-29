type MediaLike = string | { url?: string | null } | null | undefined;

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

function normalizeUrl(url: string): string {
  if (!url) return url;

  if (url.startsWith('/')) return url;

  try {
    const parsed = new URL(url);

    // Convert dev-only absolute media URLs to relative paths for deploy safety.
    if (LOCAL_HOSTNAMES.has(parsed.hostname)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function resolveMediaUrl(media: MediaLike, fallback = '/placeholder.svg'): string {
  if (!media) return fallback;

  if (typeof media === 'string') {
    return normalizeUrl(media) || fallback;
  }

  if (typeof media === 'object' && typeof media.url === 'string') {
    return normalizeUrl(media.url) || fallback;
  }

  return fallback;
}
