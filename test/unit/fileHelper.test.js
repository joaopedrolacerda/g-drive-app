import { describe, test, expect, jest } from '@jest/globals';

import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';
import Routes from '../../src/routes.js';
describe('#fileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return file statuses in correct format', async () => {
      const statMock = {
        dev: 2049,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 13046,
        size: 294,
        blocks: 8,
        atimeMs: 1631190472976.5222,
        mtimeMs: 1631191159619.4485,
        ctimeMs: 1631191159619.4485,
        birthtimeMs: 1631190472976.5222,
        atime: '2021-09-09T12:27:52.977Z,',
        mtime: '2021-09-09T12:39:19.619Z,',
        ctime: '2021-09-09T12:39:19.619Z,',
        birthtime: '2021-09-09T12:27:52.977Z',
      };

      const mockUser = 'joaopedro';

      process.env.USER = mockUser;

      const filename = 'file.png';

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFileStatus('/tmp');

      const expectedResult = [
        {
          size: '294 B',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
