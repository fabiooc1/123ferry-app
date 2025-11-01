import { z } from "zod";

const MIN_LENGTH = 6;
const MIN_LENGTH_MSG = `deve ter no mínimo ${MIN_LENGTH} caracteres.`;

const HAS_DIGIT = /(?=.*\d)/;
const HAS_DIGIT_MSG = "deve conter pelo menos um número.";

const HAS_UPPER = /(?=.*[A-Z])/;
const HAS_UPPER_MSG = "deve conter pelo menos uma letra maiúscula.";

const HAS_LOWER = /(?=.*[a-z])/;
const HAS_LOWER_MSG = "deve conter pelo menos uma letra minúscula.";

const HAS_SPECIAL = /(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/;
const HAS_SPECIAL_MSG = "deve conter pelo menos um caractere especial.";

export const passwordSchema = z
  .string()
  .min(MIN_LENGTH, MIN_LENGTH_MSG)
  .refine((val) => HAS_DIGIT.test(val), HAS_DIGIT_MSG)
  .refine((val) => HAS_UPPER.test(val), HAS_UPPER_MSG)
  .refine((val) => HAS_LOWER.test(val), HAS_LOWER_MSG)
  .refine((val) => HAS_SPECIAL.test(val), HAS_SPECIAL_MSG);

export const fullNameSchema = z
  .string()
  .min(1, "O nome completo é obrigatório")
  .refine((value) => value.trim().split(/\s+/).length >= 2, {
    message: "Por favor, digite seu nome e sobrenome",
  });

export const cpfSchema = z.string().min(14, "CPF inválido");

export const bornDateSchema = z
  .string()
  .min(10, "Data de nascimento inválida (DD/MM/AAAA)")
  .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
    message: "Formato de data inválido (DD/MM/AAAA)",
  })
  .transform((dateString, ctx) => {
    const [day, month, year] = dateString.split("/").map(Number);

    const utcDate = new Date(Date.UTC(year, month - 1, day));
    if (utcDate.getUTCDate() !== day || utcDate.getUTCMonth() !== month - 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: "Data inválida (ex: 31 de Fevereiro)",
      });
      return z.NEVER;
    }
    return utcDate.toISOString();
  });
