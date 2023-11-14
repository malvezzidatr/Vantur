export default {
  setupFilesAfterEnv: ['./setupTests.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '.*\\.spec\\.ts$', // Padrão de nomenclatura dos arquivos de teste
  collectCoverage: true, // Habilitar cobertura de código
  coveragePathIgnorePatterns: ['.module.ts'],
  coverageDirectory: 'coverage', // Diretório para os relatórios de cobertura
  coverageReporters: ['text', 'lcov'], // Formato dos relatórios de cobertura
};
