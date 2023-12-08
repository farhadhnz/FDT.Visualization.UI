import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplService {

  constructor() { }

  calculateSPL(rotorDiameter: number, powerRating: number, windSpeed: number, distance: number, hubHeight: number): number {
    
    const airDensity = 1.225;
    const bladeAngle = 0;
    const bladeChord = 3;
    const turbulenceIntensity = 0.1;
    const directivityFactor = 1;
    
    const rotorRadius = rotorDiameter / 2;

    const angularVelocity = this.calculateAngularVelocity(powerRating, windSpeed, rotorRadius); 

    const SPL1 = this.calculateSPL1(rotorRadius, bladeChord, airDensity, angularVelocity, turbulenceIntensity, bladeAngle, distance);
    const SPL2 = this.calculateSPL2(rotorRadius, windSpeed, directivityFactor, distance);

    const totalSPL = 10 * Math.log10(Math.pow(10, SPL1 / 10) + Math.pow(10, SPL2 / 10));

    return totalSPL;
  }

  private calculateAngularVelocity(powerRating: number, windSpeed: number, rotorRadius: number): number {
    return windSpeed / rotorRadius;
  }

  private calculateSPL1(rotorRadius: number, bladeChord: number, airDensity: number, angularVelocity: number, turbulenceIntensity: number, bladeAngle: number, distance: number): number {
    return 20 * Math.log10(rotorRadius) + 10 * Math.log10(bladeChord) + 10 * Math.log10(airDensity) - 20 * Math.log10(distance);
  }

  private calculateSPL2(rotorRadius: number, windSpeed: number, directivityFactor: number, distance: number): number {
    return 20 * Math.log10(rotorRadius) + 10 * Math.log10(windSpeed) + 10 * Math.log10(directivityFactor) - 20 * Math.log10(distance);
  }
}
