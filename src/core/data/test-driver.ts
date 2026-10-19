import type { CreateUserInput } from '@/core/domain/user/user.types';
import type { VehicleInput } from '@/core/domain/vehicle/vehicle.types';

// Dados fictícios para testar o app em desenvolvimento. Não são usados em builds de produção.
export const testDriver = {
  email: 'motorista.teste@rotauni.dev',
  password: 'teste1234',
  profile: {
    name: 'Carlos Mendes',
    university: 'UNIFOR',
    campus: 'Campus Edson Queiroz',
  } satisfies CreateUserInput,
  vehicle: {
    model: 'Honda Civic',
    color: 'Prata',
    plate: 'ABC1D23', // padrão Mercosul
    seats: 4,
  } satisfies VehicleInput,
};
