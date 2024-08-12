import { format } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Mengubah string tanggal ke dalam format "1 Maret 2023"
 * @param dateStr String tanggal dalam format ISO
 * @returns String tanggal dalam format "1 Maret 2023"
 */
export function formatDateIndonesian(dateStr: string): string {
  const date = new Date(dateStr);
  return format(date, 'd MMMM yyyy', { locale: id });
}

export function generateUniqueString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
