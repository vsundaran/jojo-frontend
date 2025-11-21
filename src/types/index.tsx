export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  languages: string[];
  profileCompleted: boolean;
  hearts: number;
  callCount: number;
  rating: number;
  isVerified: boolean;
}

export interface Moment {
  _id: string;
  creator: User;
  category: string;
  subCategory: string;
  content: string;
  languages: string[];
  scheduleType: 'immediate' | 'later';
  scheduledTime?: string;
  activeTime: number;
  expiresAt: string;
  status: 'active' | 'expired' | 'cancelled';
  hearts: number;
  callCount: number;
  isAvailable: boolean;
  hasHearted?: boolean;
}

export interface Call {
  id: string;
  callId: string;
  moment: Moment;
  creator: User;
  participant: User;
  category: string;
  subCategory: string;
  languages: string[];
  status: 'initiated' | 'connected' | 'completed' | 'failed' | 'reported';
  startTime: string;
  endTime?: string;
  duration: number;
  creatorToken?: string;
  participantToken?: string;
  azureCallConnectionId?: string;
}

export interface Review {
  _id: string;
  call: string;
  fromUser: User;
  toUser: User;
  rating: number;
  type: 'creator' | 'participant';
  createdAt: string;
}

export type ApiResponse<T = {}> = {
  success: boolean;
  message: string;
} & T;

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    error: string;
    success: string;
    warning: string;
    text: string;
    darkText: string;
    textSecondary: string;
    border: string;
    placeholder: string;
    gradientColors: [string, string, string, string, string];
    statusBar: string;
    jojoLogoColor: string;
    modalBackground: string;
    transperent: string;
    nonActiveChip: string;
    wishesColor: string;
    wishesBorderColor: string;
    greenSurface: string;
    green: string;
    motivationBorderColor: string;
    motivationColor: string;
    songBorderColor: string;
    songColor: string;
    blessingsColor: string;
    blessingsBorderColor: string;
    iconDefaultColor: string;
    celebrationColor: string;
    celebrationBorderColor: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: object;
    h2: object;
    h3: object;
    body: object;
    caption: object;
    button: object;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  headerHeight: number;
}

export interface CallSession {
  id: string;
  callId: string;
  moment: Moment;
  creator: User;
  participant: User;
  category: string;
  subCategory: string;
  languages: string[];
  status: 'initiated' | 'connected' | 'completed' | 'failed' | 'reported';
  startTime: string;
  endTime?: string;
  duration: number;
  creatorToken?: string;
  participantToken?: string;
  azureCallConnectionId?: string;
}

export interface CategoryCount {
  _id: string;
  count: number;
}

export interface AvailableMomentsResponse {
  moments: Moment[];
  categoryCounts: CategoryCount[];
}
