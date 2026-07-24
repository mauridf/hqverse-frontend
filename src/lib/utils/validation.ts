export const validators = {
  isEmail: (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  isUrl: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  isPhone: (value: string): boolean => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
  },

  isCpf: (value: string): boolean => {
    const clean = value.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    // Simple validation - could be enhanced
    return true;
  },

  isCnpj: (value: string): boolean => {
    const clean = value.replace(/\D/g, '');
    if (clean.length !== 14) return false;
    // Simple validation - could be enhanced
    return true;
  },

  isPostalCode: (value: string): boolean => {
    const clean = value.replace(/\D/g, '');
    return clean.length === 8;
  },

  isStrongPassword: (value: string): boolean => {
    const hasMinLength = value.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasMinLength && hasLetter && hasNumber && hasSpecial;
  },

  isUsername: (value: string): boolean => {
    return /^[a-zA-Z0-9_]{3,100}$/.test(value);
  },

  isDisplayName: (value: string): boolean => {
    return value.length >= 1 && value.length <= 255;
  },

  getPasswordStrength: (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;

    let label = 'Fraca';
    let color = 'bg-error';
    
    if (score >= 80) {
      label = 'Forte';
      color = 'bg-green-500';
    } else if (score >= 50) {
      label = 'Média';
      color = 'bg-tertiary-fixed-dim';
    }

    return { score, label, color };
  },

  getPasswordChecks: (password: string): {
    length: boolean;
    letter: boolean;
    number: boolean;
    special: boolean;
  } => ({
    length: password.length >= 8,
    letter: /[a-zA-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }),
};
