import got from 'got';
import { PDFDocument } from 'pdf-lib';
import { MappedTimetables } from '../interfaces/MappedTimetables.js';
import { OCRResponse } from '../interfaces/OCRResponse.js';
import { getTimetable } from './schoolWebsiteParsing.js';
import { sleep } from '../utilities/sleep.js';
import { Base64Timetables } from '../interfaces/Base64Timetables.js';
import dotenv from 'dotenv';
dotenv.config();

const getTimetablePagesBytes = async (): Promise<Uint8Array[]> => {
  return new Promise(async (resolve) => {
    const pdfBytesArr: Uint8Array[] = [];
    const timetable = await getTimetable();
    const pdfDoc = await PDFDocument.load(timetable);
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      const subDocument = await PDFDocument.create();
      const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
      subDocument.addPage(copiedPage);
      const pageBytes = await subDocument.save();
      pdfBytesArr.push(pageBytes);
    }
    resolve(pdfBytesArr);
  });
};

const mapClassesToTimetables = async (): Promise<MappedTimetables> => {
  return new Promise(async (resolve) => {
    const timetablePagesBytes = await getTimetablePagesBytes();
    const timetables: MappedTimetables = [];
    for (const timetable of timetablePagesBytes) {
      const itemIndex = timetablePagesBytes.indexOf(timetable);
      if (itemIndex % 10 === 0 && itemIndex !== 0) {
        await sleep(60000);
        const request = await got.post(process.env.AI_URL_ENDPOINT, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.AI_KEY,
            'Content-Type': 'application/octet-stream',
          },
          body: Buffer.from(timetable),
        });
        const status_url = request.headers['operation-location'] as string;
        setTimeout(async () => {
          const resultResponse = (
            await got(status_url, {
              headers: {
                'Ocp-Apim-Subscription-Key': process.env.AI_KEY,
              },
            })
          ).body;
          const result: OCRResponse = JSON.parse(resultResponse);
          const className = result.analyzeResult.readResults[0].lines[0].text;
          timetables.push({
            className: className,
            timetable: timetable,
          });
        }, 1000);
      } else {
        await sleep(1500);
        const request = await got.post(process.env.AI_URL_ENDPOINT, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.AI_KEY,
            'Content-Type': 'application/octet-stream',
          },
          body: Buffer.from(timetable),
        });
        const status_url = request.headers['operation-location'] as string;
        setTimeout(async () => {
          const resultResponse = (
            await got(status_url, {
              headers: {
                'Ocp-Apim-Subscription-Key': process.env.AI_KEY,
              },
            })
          ).body;
          const result: OCRResponse = JSON.parse(resultResponse);
          const className = result.analyzeResult.readResults[0].lines[0].text;
          timetables.push({
            className: className,
            timetable: timetable,
          });
        }, 1000);
      }
    }
    while (timetables.length !== timetablePagesBytes.length) await sleep(1000);
    resolve(timetables);
  });
};

const getPDFsInBase64 = async (): Promise<Base64Timetables> => {
  return new Promise(async (resolve) => {
    const mappedTimetables = await mapClassesToTimetables();
    const blobbedTimetables: Base64Timetables = [];
    for (const mappedTimetable of mappedTimetables) {
      blobbedTimetables.push({
        className: mappedTimetable.className,
        timetable: `data:application/pdf;base64,${Buffer.from(
          mappedTimetable.timetable,
        ).toString('base64')}`,
      });
    }
    resolve(blobbedTimetables);
  });
};

export { mapClassesToTimetables, getTimetablePagesBytes, getPDFsInBase64 };
