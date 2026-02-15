import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileData, ProfileSection } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private profileDataSubject = new BehaviorSubject<ProfileData>(this.getDefaultProfile());
  public profileData$: Observable<ProfileData> = this.profileDataSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private getDefaultProfile(): ProfileData {
    return {
      name: 'Francis Peixoto',
      title: 'Director of Software Development',
      language: 'fr',
      sections: [
        {
          id: 'header',
          type: 'header',
          title: 'Header',
          content: {
            name: 'Francis Peixoto',
            title: 'Director of Software Development',
            tagline: 'exo - Montreal Transit Agency'
          },
          visible: true,
          order: 0
        },
        {
          id: 'about',
          type: 'about',
          title: 'About',
          content: {
            description: 'Leading software development initiatives at exo, focusing on web development, vehicular IoT, and Infrastructure as Code.'
          },
          visible: true,
          order: 1
        }
      ]
    };
  }

  getProfile(): ProfileData {
    return this.profileDataSubject.value;
  }

  updateProfile(profile: ProfileData): void {
    this.profileDataSubject.next(profile);
    this.saveToLocalStorage(profile);
  }

  updateSection(section: ProfileSection): void {
    const profile = this.getProfile();
    const index = profile.sections.findIndex(s => s.id === section.id);
    if (index !== -1) {
      profile.sections[index] = section;
      this.updateProfile(profile);
    }
  }

  addSection(section: ProfileSection): void {
    const profile = this.getProfile();
    profile.sections.push(section);
    this.updateProfile(profile);
  }

  deleteSection(sectionId: string): void {
    const profile = this.getProfile();
    profile.sections = profile.sections.filter(s => s.id !== sectionId);
    this.updateProfile(profile);
  }

  toggleSectionVisibility(sectionId: string): void {
    const profile = this.getProfile();
    const section = profile.sections.find(s => s.id === sectionId);
    if (section) {
      section.visible = !section.visible;
      this.updateProfile(profile);
    }
  }

  reorderSections(sections: ProfileSection[]): void {
    const profile = this.getProfile();
    profile.sections = sections.map((s, index) => ({ ...s, order: index }));
    this.updateProfile(profile);
  }

  private saveToLocalStorage(profile: ProfileData): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('profile-data', JSON.stringify(profile));
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('profile-data');
      if (data) {
        try {
          const profile = JSON.parse(data);
          this.profileDataSubject.next(profile);
        } catch (e) {
          console.error('Error loading profile data from localStorage', e);
        }
      }
    }
  }

  exportData(): string {
    return JSON.stringify(this.getProfile(), null, 2);
  }

  importData(jsonData: string): void {
    try {
      const profile = JSON.parse(jsonData);
      this.updateProfile(profile);
    } catch (e) {
      throw new Error('Invalid JSON data');
    }
  }
}
