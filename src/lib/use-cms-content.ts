export function useCmsContent(): boolean {
  return process.env.NEXT_PUBLIC_USE_CMS_CONTENT === 'true';
}
