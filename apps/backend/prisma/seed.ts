import { randomUUID } from 'crypto';
import { prisma } from '../src/lib/prisma';

async function main() {
  const reporterUuids = Array.from({ length: 6 }, () => randomUUID()) as [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  const editorUuids = Array.from({ length: 4 }, () => randomUUID()) as [
    string,
    string,
    string,
    string,
  ];

  const reporters = [
    { uuid: reporterUuids[0], name: 'Sarah Chen', city: 'New York', country: 'USA' },
    { uuid: reporterUuids[1], name: 'Marco Rossi', city: 'London', country: 'UK' },
    { uuid: reporterUuids[2], name: 'Aisha Patel', city: 'Toronto', country: 'Canada' },
    { uuid: reporterUuids[3], name: "Liam O'Brien", city: 'Berlin', country: 'Germany' },
    { uuid: reporterUuids[4], name: 'Yuki Tanaka', city: 'Tokyo', country: 'Japan' },
    { uuid: reporterUuids[5], name: 'Elena Vasquez', city: 'Sydney', country: 'Australia' },
  ];

  const editors = [
    { uuid: editorUuids[0], name: 'James Wright', city: 'New York', country: 'USA' },
    { uuid: editorUuids[1], name: 'Fatima Al-Rashid', city: 'London', country: 'UK' },
    { uuid: editorUuids[2], name: 'Henrik Nielsen', city: 'Copenhagen', country: 'Denmark' },
    { uuid: editorUuids[3], name: 'Clara Dubois', city: 'Paris', country: 'France' },
  ];

  for (const r of reporters) {
    await prisma.employees.create({
      data: {
        id: r.uuid,
        name: r.name,
        role: 'REPORTER',
        city: r.city,
        country: r.country,
        availability: true,
      },
    });
  }

  for (const e of editors) {
    await prisma.employees.create({
      data: {
        id: e.uuid,
        name: e.name,
        role: 'EDITOR',
        city: e.city,
        country: e.country,
        availability: true,
      },
    });
  }

  const jobs = [
    {
      caseName: 'City Council Budget Hearings',
      type: 'PHYSICAL',
      duration: 180,
      status: 'COMPLETED',
      reporterId: reporterUuids[0],
      reporterFee: 500,
      editorId: editorUuids[0],
      editorFee: 400,
      city: 'New York',
      country: 'USA',
    },
    {
      caseName: 'Supreme Court Appeals Q3',
      type: 'PHYSICAL',
      duration: 480,
      status: 'REVIEWED',
      reporterId: reporterUuids[1],
      reporterFee: 750,
      editorId: editorUuids[1],
      editorFee: 600,
      city: 'London',
      country: 'UK',
    },
    {
      caseName: 'Corporate Merger Deposition',
      type: 'REMOTE',
      duration: 240,
      status: 'TRANSCRIBED',
      reporterId: reporterUuids[2],
      reporterFee: 300,
      editorId: editorUuids[2],
      editorFee: 250,
      city: 'Toronto',
      country: 'Canada',
    },
    {
      caseName: 'Environmental Impact Tribunal',
      type: 'REMOTE',
      duration: 600,
      status: 'ASSIGNED',
      reporterId: reporterUuids[3],
      reporterFee: 1000,
      editorId: editorUuids[3],
      editorFee: 800,
      city: 'Berlin',
      country: 'Germany',
    },
    {
      caseName: 'Patent Infringement Trial',
      type: 'PHYSICAL',
      duration: 960,
      status: 'NEW',
      reporterId: reporterUuids[4],
      reporterFee: null,
      editorId: null,
      editorFee: null,
      city: 'Tokyo',
      country: 'Japan',
    },
  ] as const;

  for (const j of jobs) {
    await prisma.jobs.create({
      data: {
        id: randomUUID(),
        caseName: j.caseName,
        type: j.type,
        duration: j.duration,
        status: j.status,
        city: j.city,
        country: j.country,
        reporterId: j.reporterId,
        reporterFee: j.reporterFee,
        editorId: j.editorId,
        editorFee: j.editorFee,
      },
    });
  }

  console.log(`Seeded ${reporters.length + editors.length} employees and ${jobs.length} jobs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
