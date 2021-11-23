type Quadruple = [number, number, number, number];

export class Polynomial {
  coefficients: Quadruple;
  constructor(c0: number, c1: number = 0, c2: number = 0, c3: number = 0) {
    this.coefficients = [c0, c1, c2, c3];
  }

  private apply(
    fn: (coefficient: number, index: number) => number
  ): Polynomial {
    const result = this.coefficients.map(fn) as Quadruple;
    return new Polynomial(...result);
  }

  plus(other: Polynomial): Polynomial {
    return this.apply((c, i) => c + other.coefficients[i]);
  }

  minus(other: Polynomial): Polynomial {
    return this.plus(other.multiply(-1));
  }

  multiply(m: number): Polynomial {
    return this.apply((c) => c * m);
  }

  solveFor(t: number): number {
    return this.coefficients.reduceRight((prev, current) => prev * t + current);
  }
}
