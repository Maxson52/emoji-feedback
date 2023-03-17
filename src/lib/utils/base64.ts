export function toBase64(str: string | null): string {
  if (str === null) return "";
  return window.btoa(encodeURIComponent(str));
}

export function toUTF8(str: string | null): string {
  if (str === null) return "";
  return decodeURIComponent(window.atob(str));
}
