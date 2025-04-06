// Tipos
export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface FormField {
  value: string;
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  customValidation?: (value: string) => boolean;
  confirmField?: {
    value: string;
    fieldName: string;
  };
}

export type FormValidation = {
  [key: string]: FormField;
};

// Regex patterns
export const PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  phone: /^\(\d{2}\)\s\d{5}-\d{4}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/
};

// Mensagens de erro
export const MESSAGES = {
  required: (field: string) => `O campo ${field} é obrigatório`,
  invalid: {
    email: 'Por favor, insira um endereço de email válido (exemplo@dominio.com)',
    confirmEmail: 'Os endereços de email não coincidem',
    cpf: 'Por favor, insira um CPF válido (XXX.XXX.XXX-XX)',
    phone: 'Por favor, insira um telefone válido ((XX) XXXXX-XXXX)',
    password: 'A senha deve conter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais (@$!%*?&)',
    confirmPassword: 'As senhas não coincidem',
    name: 'Por favor, insira um nome válido (apenas letras e espaços)'
  },
  length: {
    min: (field: string, length: number) => `O campo ${field} deve ter no mínimo ${length} caracteres`,
    max: (field: string, length: number) => `O campo ${field} deve ter no máximo ${length} caracteres`
  },
  format: {
    cpf: 'CPF deve estar no formato XXX.XXX.XXX-XX',
    phone: 'Telefone deve estar no formato (XX) XXXXX-XXXX'
  }
};

// Funções de validação
export const validateField = (name: string, field: FormField): string => {
  // Validação de campo obrigatório
  if (field.required && !field.value.trim()) {
    return MESSAGES.required(name);
  }

  // Validação de comprimento mínimo
  if (field.minLength && field.value.length < field.minLength) {
    return MESSAGES.length.min(name, field.minLength);
  }

  // Validação de comprimento máximo
  if (field.maxLength && field.value.length > field.maxLength) {
    return MESSAGES.length.max(name, field.maxLength);
  }

  // Validação de padrão (regex)
  if (field.pattern && field.value && !field.pattern.test(field.value)) {
    return MESSAGES.invalid[name as keyof typeof MESSAGES.invalid] || `${name} inválido`;
  }

  // Validação de confirmação (email/senha)
  if (field.confirmField && field.value !== field.confirmField.value) {
    return MESSAGES.invalid[`confirm${field.confirmField.fieldName}` as keyof typeof MESSAGES.invalid] || 
           `Os campos não coincidem`;
  }

  // Validação customizada
  if (field.customValidation && !field.customValidation(field.value)) {
    return `${name} inválido`;
  }

  return '';
};

// Funções específicas de validação
export const validateEmail = (email: string): boolean => {
  return PATTERNS.email.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  if (!PATTERNS.cpf.test(cpf)) return false;
  
  const numbers = cpf.replace(/\D/g, '');
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numbers)) return false;
  
  // Validação do algoritmo do CPF
  let sum = 0;
  let remainder: number;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(numbers.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(numbers.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.substring(10, 11))) return false;
  
  return true;
};

export const validatePhone = (phone: string): boolean => {
  return PATTERNS.phone.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return PATTERNS.password.test(password);
};

export const validateName = (name: string): boolean => {
  return PATTERNS.name.test(name);
};

// Funções de formatação
export const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .slice(0, 14);
};

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

// Função de validação de formulário completo
export const validateForm = (validation: FormValidation): ValidationResult => {
  const errors: { [key: string]: string } = {};
  let isValid = true;

  Object.entries(validation).forEach(([name, field]) => {
    const error = validateField(name, field);
    if (error) {
      errors[name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
}; 