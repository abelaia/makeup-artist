import {Instagram, MessageCircle, MessagesSquare, Phone, Send} from 'lucide-vue-next';
import {SECTION_IDS} from '@/core/constants';

const STUB_HREF = `#${SECTION_IDS.contacts}`;

/** @type {readonly import('@/core/types').Social[]} */
export const SOCIALS = Object.freeze([
    {
        id: 'telegram',
        title: 'Telegram',
        action: 'Написать в Telegram',
        href: STUB_HREF,
        icon: Send,
        isPrimary: true,
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp',
        action: 'Написать в WhatsApp',
        href: STUB_HREF,
        icon: MessageCircle,
    },
    {
        id: 'instagram',
        title: 'Instagram',
        action: 'Директ в Instagram',
        href: STUB_HREF,
        icon: Instagram,
    },
    {
        id: 'vk',
        title: 'VK',
        action: 'Написать во ВКонтакте',
        href: STUB_HREF,
        icon: MessagesSquare,
    },
    {
        id: 'phone',
        title: 'Телефон',
        action: '+7 999 000-00-00',
        href: STUB_HREF,
        icon: Phone,
    },
]);
