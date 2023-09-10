import z from 'zod';

const RegisterSchemaValidator = z.object({
  name: z
    .string()
    .min(1, { message: 'Ingrese un nombre válido' })
    .refine((value) => !/\d/.test(value), {
      message: 'El nombre no puede contener números',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'El nombre no puede estar vacío',
    }),
  email: z.string().email({ message: 'Ingrese un email válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'La contraseña no puede estar vacía',
    }),
  role: z.enum(['RECEPCION', 'SUPERVISOR']),
});

const LoginSchemaValidator = z.object({
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'La contraseña no puede estar vacía',
    }),
  email: z.string().email({ message: 'Ingrese un email válido' }),
});

export { RegisterSchemaValidator, LoginSchemaValidator };

export type RegisterSchemaType = z.infer<typeof RegisterSchemaValidator>;
export type LoginSchemaType = z.infer<typeof LoginSchemaValidator>;
