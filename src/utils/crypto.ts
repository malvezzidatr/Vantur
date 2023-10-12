import * as bcrypt from 'bcrypt';

export function encryptPsswd(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (hashErr, hash) => {
          if (hashErr) {
            reject(hashErr);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

export function comparePsswd(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
