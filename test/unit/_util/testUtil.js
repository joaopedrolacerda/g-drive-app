import { read } from 'fs';
import { format } from 'path';
import { Readable, Writable, Transform } from 'stream';
export default class TestUtil {
  static generateReadableStream(data) {
    return new Readable({
      objectMode: true,
      async read() {
        for (const item of data) {
          this.push(data);
        }

        this.push(null);
      },
    });
  }
  static generateWritableStream(onData) {
    return new Writable({
      objectMode: true,
      write(chunk, encondig, cb) {
        onData(chunk);

        cb(null, chunk);
      },
    });
  }

  static generateTransformStream() {
    return new Transform({
      objectMode: true,
      transform(chunk, encondig, cb) {
        onData(chunk);

        cb(null, chunk);
      },
    });
  }
}
