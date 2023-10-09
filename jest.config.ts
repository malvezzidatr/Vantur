export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '.*\\.spec\\.ts$', // Padrão de nomenclatura dos arquivos de teste
  collectCoverage: true, // Habilitar cobertura de código
  coverageDirectory: 'coverage', // Diretório para os relatórios de cobertura
  coverageReporters: ['text', 'lcov'], // Formato dos relatórios de cobertura
  moduleNameMapper: {
    // Mapeamento de módulos, se necessário
    '^@users/(.*)$': '<rootDir>/src/users/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Caminho para o arquivo tsconfig.json
    },
  },
  // Outras configurações específicas do seu projeto
};
