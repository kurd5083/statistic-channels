import RocketIcon from '@/icons/RocketIcon';
import ShopIcon from '@/icons/ShopIcon';
import UsersIcon from '@/icons/UsersIcon';
import NoteIcon from '@/icons/NoteIcon';

export const metricsConfig = [
  {
    id: "1",
    title: "Подписки",
    subtitle: "24H",
    sign: '+',
    extra: "Человека",
    icon: UsersIcon,
  },
  {
    id: "2",
    title: "Отписки",
    subtitle: "24H",
    sign: '-',
    extra: "человека",
    icon: ShopIcon,
  },
  {
    id: "3",
    title: "Чистый трафик",
    subtitle: "ВСЕГО",
    extra: "В работе",
    icon: RocketIcon,
  },
  {
    id: "4",
    title: "Конверсия",
    subtitle: "НОВОЕ",
    subtitleBac: true,
    sign: 'up',
    extra: "%",
    icon: NoteIcon,
  },
];