export interface GuestsResponseData {
  guests: Guest[];
  meta: Meta;
}

export interface Guest {
  _id: string;
  date: string;
  time: string;
  name: string;
  identificationCard: string;
  dateOfEntry: string;
  reason: string;
  department: Department;
  status: Status;
  note: string;
}

export interface Meta {
  totalPages: number;
  page: number;
  hasNextPage: boolean;
}

interface Department {
  _id: string;
  type: Type;
}

enum Type {
  Administracion = 'ADMINISTRACION',
  Proveedores = 'PROVEEDORES',
  ServicioAlCliente = 'SERVICIO AL CLIENTE',
  Ventas = 'VENTAS',
}

enum Status {
  EnCurso = 'EN CURSO',
  Finalizado = 'FINALIZADO',
}
