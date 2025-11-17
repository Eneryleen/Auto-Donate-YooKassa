export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateMinecraftUsername(username: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return {
      valid: false,
      error: 'Никнейм не может быть пустым',
    };
  }

  const trimmed = username.trim();

  if (trimmed.length < 3) {
    return {
      valid: false,
      error: 'Никнейм должен содержать минимум 3 символа',
    };
  }

  if (trimmed.length > 16) {
    return {
      valid: false,
      error: 'Никнейм не может быть длиннее 16 символов',
    };
  }

  if (/\s/.test(trimmed)) {
    return {
      valid: false,
      error: 'Никнейм не может содержать пробелы',
    };
  }

  const minecraftUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!minecraftUsernameRegex.test(trimmed)) {
    return {
      valid: false,
      error: 'Никнейм может содержать только буквы, цифры и подчеркивание',
    };
  }

  return {
    valid: true,
  };
}

export function sanitizeUsername(username: string): string {
  return username.trim().replace(/[^a-zA-Z0-9_]/g, '');
}
