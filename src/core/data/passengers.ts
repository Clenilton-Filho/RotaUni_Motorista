import type { RequestPassenger } from '@/core/domain/requests/ride-request.types';

// Passageiros simulados. Quando existir o backend, as solicitações virão do app do passageiro.
export const mockPassengers: RequestPassenger[] = [
  { id: 'passenger-001', name: 'Mariana Alves', university: 'UNIFOR', course: 'Direito', rating: 4.9 },
  { id: 'passenger-002', name: 'Pedro Lima', university: 'UNIFOR', course: 'Engenharia Civil', rating: 4.7 },
  { id: 'passenger-003', name: 'Lucas Rocha', university: 'UFC', course: 'Computação', rating: 4.8 },
  { id: 'passenger-004', name: 'Ana Beatriz', university: 'UECE', course: 'Medicina', rating: 5 },
  { id: 'passenger-005', name: 'Rafael Nunes', university: 'UFC', course: 'Arquitetura', rating: 4.5 },
  { id: 'passenger-006', name: 'Camila Freitas', university: 'UNIFOR', course: 'Psicologia', rating: 4.9 },
  { id: 'passenger-007', name: 'Diego Ramos', university: 'UECE', course: 'Administração', rating: 4.6 },
  { id: 'passenger-008', name: 'Larissa Gomes', university: 'UFC', course: 'Biologia', rating: 4.8 },
];
