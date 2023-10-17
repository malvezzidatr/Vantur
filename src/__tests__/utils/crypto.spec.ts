import * as bcrypt from 'bcrypt';
import { encryptPsswd, comparePsswd } from '../../utils/crypto';

jest.mock('bcrypt');

describe('bcrypt utility functions', () => {
  describe('encryptPsswd', () => {
    it('should hash a password', async () => {
      const password = 'myPassword123';
      const hashedPassword = 'hashedPassword';

      (bcrypt.genSalt as jest.Mock).mockImplementation((_, callback) => {
        callback(null, 'mockedSalt');
      });

      (bcrypt.hash as jest.Mock).mockImplementation((_, __, callback) => {
        callback(null, hashedPassword);
      });

      const result = await encryptPsswd(password);
      expect(result).toBe(hashedPassword);
    });

    it('should handle errors during hashing', async () => {
      (bcrypt.genSalt as jest.Mock).mockImplementation((_, callback) => {
        callback(new Error('Mocked error'));
      });

      await expect(encryptPsswd('password')).rejects.toThrow('Mocked error');
    });

    it('should handle errors during hash', async () => {
      (bcrypt.genSalt as jest.Mock).mockImplementation((_, callback) => {
        callback(null, 'mockedSalt');
      });

      (bcrypt.hash as jest.Mock).mockImplementation((_, __, callback) => {
        callback(new Error('Mocked hash error'));
      });

      await expect(encryptPsswd('password')).rejects.toThrow(
        'Mocked hash error',
      );
    });
  });

  describe('comparePsswd', () => {
    it('should compare a password and hash', async () => {
      const password = 'myPassword123';
      const hashedPassword = 'hashedPassword';

      (bcrypt.compare as jest.Mock).mockImplementation((_, __, callback) => {
        callback(null, true);
      });

      const result = await comparePsswd(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should handle errors during comparison', async () => {
      (bcrypt.compare as jest.Mock).mockImplementation((_, __, callback) => {
        callback(new Error('Mocked error'));
      });

      await expect(comparePsswd('password', 'hash')).rejects.toThrow(
        'Mocked error',
      );
    });
  });
});
