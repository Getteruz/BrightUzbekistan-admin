import { AcesIcon, ArchiveIcon2, DocIcon, HomeIcon, PlusIcon2, ReklamaIcon, StatistikaIcon, UserIcon } from "../icons";

export const links = [
    {
        id: 1,
        label: 'Дом',
        icon: HomeIcon,
        link: '/'
    },
    {
        id: 2,
        label: 'Мои новости',
        icon: DocIcon,
        link: '/news'
    },
    {
        id: 8,
        label: 'Общий доступ',
        icon: AcesIcon,
        link: '/general-access'
    },
   
    {
        id: 3,
        label: 'Пользователи',
        icon:  UserIcon,
        link: '/users'
    },
    {
        id: 4,
        label: 'Доп-страници',
        icon:  PlusIcon2,
        link: '/dop-pages'
    },
    {
        id: 5,
        label: 'Реклама',
        icon:  ReklamaIcon,
        link: '/reklama'
    },
    {
        id: 6,
        label: 'Статистика',
        icon: StatistikaIcon,
        link: '/statistika'
    },
    {
        id: 7,
        label: 'Архив',
        icon: ArchiveIcon2,
        link: '/archive'
    },
]