import { getPDFsInBase64 } from './middleware/documentParsing.js';
import { getTimetableURL } from './middleware/schoolWebsiteParsing.js';
import got from 'got';
import cron from 'node-cron';
import fs from 'fs';

console.info('[MAIN] The script is starting...');

const main = async () => {
  console.info('[MAIN] Updating timetables...');
  const obj: { [index: string]: string } = {};
  const pdfs = await getPDFsInBase64();
  for (const schoolClass of pdfs) {
    obj[schoolClass.className] = schoolClass.timetable;
  }
  console.debug('[MAIN] Sending data to API...');
  await got.post(process.env.API_ENDPOINT, {
    json: obj,
    headers: {
      'Auth-Secret': process.env.API_SECRET,
    },
  });
};

cron.schedule('30 16 * * *', () => {
  console.info('[CRON] Updating all timetables...');
  main();
});

cron.schedule('*/5 * * * *', async () => {
  console.info('[CRON] Checking timetables link...');
  if (fs.existsSync('data/timetableLink.txt')) {
    console.debug('[TIMETABLESLNK] Saved URL exists!');
    const savedTimetableLink = await fs.promises.readFile(
      'data/timetableLink.txt',
      'utf8',
    );
    const currentTimetableLink = await getTimetableURL();
    if (savedTimetableLink !== currentTimetableLink) {
      console.debug('[TIMETABLESLNK] URLs do not match!');
      await fs.promises.writeFile(
        'data/timetableLink.txt',
        currentTimetableLink,
      );
      main();
    } else console.debug('[TIMETABLESLNK] URLs match! No need to update.');
  } else {
    console.warn("[TIMETABLESLNK] Saved URL doesn't exist! Creating file...");
    const currentTimetableLink = await getTimetableURL();
    await fs.promises.writeFile('data/timetableLink.txt', currentTimetableLink);
    main();
  }
});
