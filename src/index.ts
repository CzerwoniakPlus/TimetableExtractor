import { getPDFsInBase64 } from './middleware/documentParsing.js';
import got from 'got';

const main = async () => {
  const obj: { [index: string]: string } = {};
  const pdfs = await getPDFsInBase64();
  for (const schoolClass of pdfs) {
    obj[schoolClass.className] = schoolClass.timetable;
  }
  await got.post(process.env.API_ENDPOINT, {
    json: obj,
    headers: {
      'Auth-Secret': process.env.API_SECRET,
    },
  });
};

main();
