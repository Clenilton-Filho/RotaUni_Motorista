

import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { Palette } from '@/ui/theme/theme';
import type { RideStatus } from '@/core/domain/rides/ride.types';

import { styles } from './ride-status-badge.styles';

const statusConfig: Record<RideStatus, { label: string; color: string }> = {
  scheduled: { label: 'Agendada', color: Palette.primary },
  'in-progress': { label: 'Em andamento', color: Palette.success },
  completed: { label: 'Finalizada', color: '#60646C' },
  cancelled: { label: 'Cancelada', color: Palette.danger },
};

export function RideStatusBadge({ status }: { status: RideStatus }) {
  const { label, color } = statusConfig[status];

  return <ThemedText style={[styles.badge, { color, borderColor: color }]}>{label}</ThemedText>;
}
