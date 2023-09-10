import z from 'zod';

const GuestSchemaValidator = z.object({
  date: z
    .string()
    .min(1, { message: 'La fecha no es válida' })
    .refine((value) => value.trim().length > 0, {
      message: 'La fecha no puede estar vacía',
    }),
  time: z
    .string()
    .min(1, { message: 'La hora no es válida' })
    .refine((value) => value.trim().length > 0, {
      message: 'La hora no puede estar vacía',
    }),
  name: z
    .string()
    .min(1, { message: 'El nombre no es válido' })
    .refine((value) => !/\d/.test(value), {
      message: 'El nombre no puede contener números',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'El nombre no puede estar vacío',
    }),
  identificationCard: z
    .string()
    .min(10, { message: 'La cédula debe contener 10 dígitos' })
    .max(10, { message: 'La cédula debe contener 10 dígitos' })
    .refine((value) => /^\d+$/.test(value), {
      message: 'La cédula debe contener solo números',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'La cédula no puede estar vacía',
    }),
  dateOfEntry: z
    .string()
    .min(1, { message: 'La fecha de entrada no es válida' })
    .refine((value) => value.trim().length > 0, {
      message: 'La fecha de entrada no puede estar vacía',
    }),
  reason: z
    .string()
    .min(1, { message: 'El motivo no es válido' })
    .refine((value) => value.trim().length > 0, {
      message: 'El movito no puede estar vacío',
    }),
  department: z
    .string()
    .min(1, { message: 'El departamento no es válido' })
    .refine((value) => value.trim().length > 0, {
      message: 'El departamento no puede estar vacío',
    }),
  status: z.enum(['EN CURSO', 'FINALIZADO']),
  note: z.string(),
});
const GuestUpdateSchemaValidator = z.object({
  note: z.string().min(1, { message: 'Ingrese una nota' }),
  status: z.enum(['EN CURSO', 'FINALIZADO']),
});

export { GuestSchemaValidator, GuestUpdateSchemaValidator };

export type GuestSchemaType = z.infer<typeof GuestSchemaValidator>;
export type GuestUpdateSchemaType = z.infer<typeof GuestUpdateSchemaValidator>;
