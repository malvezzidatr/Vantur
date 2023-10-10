class PrismaClientMock {
  $connect() {}
}

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

jest.mock('@prisma/client', () => ({
  PrismaClient: PrismaClientMock,
}));

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should call $connect during onModuleInit', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');

    await prismaService.onModuleInit();

    expect(connectSpy).toHaveBeenCalled();
  });
});
