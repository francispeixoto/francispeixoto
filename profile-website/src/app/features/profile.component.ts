import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CmsService } from '../cms/services/cms.service';
import { PrintService } from '../core/services/print.service';
import { ProfileData, ProfileSection } from '../cms/models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private readonly cmsService: CmsService = inject(CmsService);
  private readonly printService: PrintService = inject(PrintService);
  public readonly translocoService: TranslocoService = inject(TranslocoService);

  profileData!: ProfileData;

  ngOnInit(): void {
    this.cmsService.profileData$.subscribe((data: ProfileData) => {
      this.profileData = data;
      this.translocoService.setActiveLang(data.language);
    });
  }

  printResume(): void {
    const element = document.getElementById('profile-content');
    if (element) {
      this.printService.generatePdf(element, 'francis-peixoto-resume');
    }
  }

  toggleLanguage(): void {
    const newLang = this.translocoService.getActiveLang() === 'fr' ? 'en' : 'fr';
    this.translocoService.setActiveLang(newLang);
    const profile = this.cmsService.getProfile();
    profile.language = newLang;
    this.cmsService.updateProfile(profile);
  }

  get visibleSections(): ProfileSection[] {
    return this.profileData?.sections?.filter((s: ProfileSection) => s.visible).sort((a: ProfileSection, b: ProfileSection) => a.order - b.order) || [];
  }
}

