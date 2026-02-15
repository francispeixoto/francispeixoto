import { TestBed } from '@angular/core/testing';
import { CmsService } from './cms.service';
import { ProfileData, ProfileSection } from '../models/profile.model';

describe('CmsService', () => {
  let service: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default profile data', () => {
    const profile = service.getProfile();
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Francis Peixoto');
    expect(profile.title).toBe('Director of Software Development');
    expect(profile.language).toBe('fr');
  });

  it('should update profile data', () => {
    const newProfile: ProfileData = {
      name: 'Test Name',
      title: 'Test Title',
      language: 'en',
      sections: []
    };

    service.updateProfile(newProfile);
    const profile = service.getProfile();

    expect(profile.name).toBe('Test Name');
    expect(profile.title).toBe('Test Title');
    expect(profile.language).toBe('en');
  });

  it('should add a new section', () => {
    const newSection: ProfileSection = {
      id: 'test-section',
      type: 'custom',
      title: 'Test Section',
      content: 'Test Content',
      visible: true,
      order: 999
    };

    service.addSection(newSection);
    const profile = service.getProfile();

    expect(profile.sections.find(s => s.id === 'test-section')).toBeDefined();
  });

  it('should toggle section visibility', () => {
    const profile = service.getProfile();
    const sectionId = profile.sections[0].id;
    const initialVisibility = profile.sections[0].visible;

    service.toggleSectionVisibility(sectionId);
    const updatedProfile = service.getProfile();

    expect(updatedProfile.sections[0].visible).toBe(!initialVisibility);
  });

  it('should delete a section', () => {
    const profile = service.getProfile();
    const sectionId = profile.sections[0].id;

    service.deleteSection(sectionId);
    const updatedProfile = service.getProfile();

    expect(updatedProfile.sections.find(s => s.id === sectionId)).toBeUndefined();
  });

  it('should export data as JSON string', () => {
    const exported = service.exportData();
    expect(typeof exported).toBe('string');
    expect(() => JSON.parse(exported)).not.toThrow();
  });

  it('should import data from JSON string', () => {
    const testData: ProfileData = {
      name: 'Imported Name',
      title: 'Imported Title',
      language: 'en',
      sections: []
    };

    const jsonData = JSON.stringify(testData);
    service.importData(jsonData);

    const profile = service.getProfile();
    expect(profile.name).toBe('Imported Name');
  });

  it('should throw error on invalid JSON import', () => {
    expect(() => service.importData('invalid json')).toThrow();
  });
});
