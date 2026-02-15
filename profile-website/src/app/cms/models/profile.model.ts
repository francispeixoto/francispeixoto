export interface ProfileSection {
  id: string;
  type: 'header' | 'about' | 'experience' | 'education' | 'skills' | 'custom';
  title: string;
  content: any;
  visible: boolean;
  order: number;
}

export interface ProfileData {
  name: string;
  title: string;
  sections: ProfileSection[];
  language: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
}
