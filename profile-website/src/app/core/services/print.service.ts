import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  generatePdf(element: HTMLElement, filename: string = 'resume'): Promise<void> {
    const options = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: {
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'] as const,
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: '.page-break-avoid'
      }
    };

    return html2pdf().set(options).from(element).save();
  }

  print(): void {
    window.print();
  }
}
