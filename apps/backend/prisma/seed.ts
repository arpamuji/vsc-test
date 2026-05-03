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
    {
      uuid: reporterUuids[0],
      name: 'Sarah Chen',
      city: 'New York',
      country: 'USA',
      availability: true,
    },
    {
      uuid: reporterUuids[1],
      name: 'Marco Rossi',
      city: 'London',
      country: 'UK',
      availability: true,
    },
    {
      uuid: reporterUuids[2],
      name: 'Aisha Patel',
      city: 'Toronto',
      country: 'Canada',
      availability: false,
    },
    {
      uuid: reporterUuids[3],
      name: "Liam O'Brien",
      city: 'Berlin',
      country: 'Germany',
      availability: true,
    },
    {
      uuid: reporterUuids[4],
      name: 'Yuki Tanaka',
      city: 'Tokyo',
      country: 'Japan',
      availability: true,
    },
    {
      uuid: reporterUuids[5],
      name: 'Elena Vasquez',
      city: 'Sydney',
      country: 'Australia',
      availability: false,
    },
  ];

  for (const r of reporters) {
    await prisma.employees.create({
      data: {
        id: r.uuid,
        name: r.name,
        role: 'REPORTER',
        city: r.city,
        country: r.country,
        availability: r.availability,
      },
    });
  }

  const editors = [
    {
      uuid: editorUuids[0],
      name: 'James Wright',
      city: 'New York',
      country: 'USA',
      availability: true,
    },
    {
      uuid: editorUuids[1],
      name: 'Fatima Al-Rashid',
      city: 'London',
      country: 'UK',
      availability: false,
    },
    {
      uuid: editorUuids[2],
      name: 'Henrik Nielsen',
      city: 'Copenhagen',
      country: 'Denmark',
      availability: true,
    },
    {
      uuid: editorUuids[3],
      name: 'Clara Dubois',
      city: 'Paris',
      country: 'France',
      availability: true,
    },
  ];

  for (const e of editors) {
    await prisma.employees.create({
      data: {
        id: e.uuid,
        name: e.name,
        role: 'EDITOR',
        city: e.city,
        country: e.country,
        availability: e.availability,
      },
    });
  }

  const jobs = [
    // COMPLETED: both reporter and editor assigned
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
    // REVIEWED: both reporter and editor assigned
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
    // TRANSCRIBED: reporter assigned, editor assigned for review
    {
      caseName: 'Corporate Merger Deposition',
      type: 'REMOTE',
      duration: 240,
      status: 'TRANSCRIBED',
      reporterId: reporterUuids[3],
      reporterFee: 300,
      editorId: editorUuids[2],
      editorFee: null,
      city: 'Berlin',
      country: 'Germany',
    },
    // ASSIGNED: reporter assigned, no editor yet (awaiting transcription)
    {
      caseName: 'Environmental Impact Tribunal',
      type: 'REMOTE',
      duration: 600,
      status: 'ASSIGNED',
      reporterId: reporterUuids[4],
      reporterFee: null,
      editorId: null,
      editorFee: null,
      city: 'Tokyo',
      country: 'Japan',
    },
    // NEW: no assignments yet (available for reporter assignment)
    {
      caseName: 'Patent Infringement Trial',
      type: 'REMOTE',
      duration: 960,
      status: 'NEW',
      reporterId: null,
      reporterFee: null,
      editorId: null,
      editorFee: null,
      city: 'Tokyo',
      country: 'Japan',
    },
    // NEW: no assignments, physical job to test same-city preference
    {
      caseName: 'Municipal Zoning Dispute',
      type: 'PHYSICAL',
      duration: 120,
      status: 'NEW',
      reporterId: null,
      reporterFee: null,
      editorId: null,
      editorFee: null,
      city: 'New York',
      country: 'USA',
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
