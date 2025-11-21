import { lightTheme } from '../theme';

export interface Category {
    id: string;
    title: string;
    primaryColor: string;
    borderColor: string;
    bgColor: string;
    subCategories: string[];
}

export const MOMENT_CATEGORIES: Category[] = [
    {
        id: 'wishes',
        title: 'Wishes',
        primaryColor: lightTheme.colors.wishesColor,
        borderColor: lightTheme.colors.wishesBorderColor,
        bgColor: '#FBEFFF',
        subCategories: [
            'Birthday',
            'Wedding Anniversary',
            'Work Anniversary',
            'Sweet 16',
            '60th Wedding',
            'New Job',
            'Graduation',
            'Baby Shower',
            'Retirement',
            'Others',
        ],
    },
    {
        id: 'motivation',
        title: 'Motivation',
        primaryColor: lightTheme.colors.motivationColor,
        borderColor: lightTheme.colors.motivationBorderColor,
        bgColor: '#EDF3FF',
        subCategories: [
            'Exam Stress',
            'Work Pressure',
            'Relationship Issues',
            'Health Issues',
            'Financial Stress',
            'Loneliness',
            'Depression',
            'Anxiety',
            'Others',
        ],
    },
    {
        id: 'songs',
        title: 'Songs',
        primaryColor: lightTheme.colors.songColor,
        borderColor: lightTheme.colors.songBorderColor,
        bgColor: '#E7F9EC',
        subCategories: [
            'Romantic',
            'Sad',
            'Happy',
            'Party',
            'Devotional',
            'Folk',
            'Classical',
            'Rock',
            'Pop',
            'Others',
        ],
    },
    {
        id: 'blessings',
        title: 'Blessings',
        primaryColor: lightTheme.colors.blessingsColor,
        borderColor: lightTheme.colors.blessingsBorderColor,
        bgColor: '#FFF8EA',
        subCategories: [
            'New Born',
            'New House',
            'New Car',
            'New Business',
            'Marriage',
            'Education',
            'Health',
            'Wealth',
            'Others',
        ],
    },
    {
        id: 'celebration',
        title: 'Celebration',
        primaryColor: lightTheme.colors.celebrationColor,
        borderColor: lightTheme.colors.celebrationBorderColor,
        bgColor: '#FFEBEB',
        subCategories: [
            'Festival',
            'Party',
            'Get Together',
            'Reunion',
            'Picnic',
            'Trip',
            'Date',
            'Others',
        ],
    },
];
