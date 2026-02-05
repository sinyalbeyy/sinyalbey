export enum Source {
  ONEPERCENT_CLUB = 'ONEPERCENT_CLUB',
  BITGET_CLUB = 'BITGET_CLUB',
}

export enum Status {
  NEW = 'NEW',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  SENT = 'SENT',
  REJECTED = 'REJECTED',
}

export interface Application {
  id: string;
  source: Source;
  status: Status;
  telegramUsername: string;
  bitgetUid: string | null;
  selectedPlan: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export const SOURCE_LABELS: Record<Source, string> = {
  [Source.ONEPERCENT_CLUB]: '%1 Club',
  [Source.BITGET_CLUB]: 'Bitget Club',
};

export const STATUS_LABELS: Record<Status, string> = {
  [Status.NEW]: 'Yeni',
  [Status.REVIEWING]: 'İnceleniyor',
  [Status.APPROVED]: 'Onaylandı',
  [Status.SENT]: 'Gönderildi',
  [Status.REJECTED]: 'Reddedildi',
};

export const STATUS_COLORS: Record<Status, string> = {
  [Status.NEW]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [Status.REVIEWING]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  [Status.APPROVED]: 'bg-green-500/20 text-green-400 border-green-500/30',
  [Status.SENT]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  [Status.REJECTED]: 'bg-red-500/20 text-red-400 border-red-500/30',
};
