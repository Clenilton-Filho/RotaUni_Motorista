export const MAX_VEHICLE_SEATS = 6;

export type Vehicle = {
  id: string;
  userId: string;
  model: string;
  color: string;
  plate: string;
  seats: number; // lugares disponíveis para passageiros (sem contar o motorista)
  createdAt: string;
};

export type VehicleInput = Pick<Vehicle, 'model' | 'color' | 'plate' | 'seats'>;

export function normalizePlate(plate: string) {
  return plate.replace(/[\s-]/g, '').toUpperCase();
}

// Aceita o padrão antigo (ABC1234) e o Mercosul (ABC1D23).
export function isValidPlate(plate: string) {
  return /^[A-Z]{3}\d[A-Z\d]\d{2}$/.test(normalizePlate(plate));
}

export function isValidSeats(seats: number) {
  return Number.isInteger(seats) && seats >= 1 && seats <= MAX_VEHICLE_SEATS;
}

// Retorna a mensagem de erro a exibir, ou null se o veículo for válido.
export function validateVehicleInput(input: VehicleInput) {
  if (!input.model.trim() || !input.color.trim() || !input.plate.trim()) {
    return 'Preencha modelo, cor e placa do veículo.';
  }
  if (!isValidPlate(input.plate)) return 'Informe uma placa válida (ex.: ABC1D23).';
  if (!isValidSeats(input.seats)) return `O veículo deve ter entre 1 e ${MAX_VEHICLE_SEATS} lugares para passageiros.`;
  return null;
}
