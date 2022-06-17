import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export const generateHash$ = (password: string) => {
  const utf8 = new TextEncoder().encode(password);

  return from(crypto.subtle.digest('SHA-256', utf8)).pipe(
    map(hashBuffer => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      return hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
    })
  );
};
