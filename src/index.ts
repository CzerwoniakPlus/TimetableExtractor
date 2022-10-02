import { getPDFsInBase64 } from './middleware/documentParsing.js';

//todo: obtain pdfs as base64 and send to api
const main = async () => {
  const obj: { [index: string]: string } = {};
  const pdfs = await getPDFsInBase64();
  for (const schoolClass of pdfs) {
    obj[schoolClass.className] = schoolClass.timetable;
  }
  //todo: send to api
};

main();
