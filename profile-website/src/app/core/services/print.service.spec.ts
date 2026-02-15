import { TestBed } from '@angular/core/testing';
import { PrintService } from './print.service';

describe('PrintService', () => {
  let service: PrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have generatePdf method', () => {
    expect(service.generatePdf).toBeDefined();
    expect(typeof service.generatePdf).toBe('function');
  });

  it('should have print method', () => {
    expect(service.print).toBeDefined();
    expect(typeof service.print).toBe('function');
  });
});
