/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("documents").del();
  // Inserts seed entries
  await knex("documents").insert([
  {
    "id": 1,
    "filename": "project-plan.docx",
    "filepath": "/uploads-documents/project-plan.docx",
    "tags": [
      "work",
      "document"
    ],
    "createdAt": "2025-03-12 15:00:00"
  },
  {
    "id": 2,
    "filename": "resume.pdf",
    "filepath": "/uploads-documents/resume.pdf",
    "tags": [
      "personal",
      "pdf"
    ],
    "createdAt": "2025-03-13 16:00:00"
  },
  {
    "id": 3,
    "filename": "presentation.pptx",
    "filepath": "/uploads-documents/presentation.pptx",
    "tags": [
      "work",
      "presentation"
    ],
    "createdAt": "2025-03-15 18:00:00"
  },
  {
    "id": 4,
    "filename": "notes.txt",
    "filepath": "/uploads-documents/notes.txt",
    "tags": [
      "personal",
      "text"
    ],
    "createdAt": "2025-03-16 18:22:52"
  },
  {
    "id": 5,
    "filename": "assignment.pdf",
    "filepath": "/uploads-documents/assignment.pdf",
    "tags": [
      "personal",
      "pdf"
    ],
    "createdAt": "2025-03-16 18:22:52"
  },
  {
    "id": 6,
    "filename": "mockup.png",
    "filepath": "/uploads-documents/mockup.jpg",
    "tags": [
      "work",
      "design"
    ],
    "createdAt": "2025-03-16 18:22:52"
  },
  {
    "id": 7,
    "filename": "invoice.pdf",
    "filepath": "/uploads-documents/invoice.pdf",
    "tags": [
      "work",
      "finance"
    ],
    "createdAt": "2025-03-16 18:22:52"
  },
  {
    "id": 8,
    "filename": "Updated Resume",
    "filepath": "/uploads-documents/1742066692333.pdf",
    "tags": [
      "job",
      "resume"
    ],
    "createdAt": "2025-03-15 19:24:52"
  },
  {
    "id": 9,
    "filename": "Resume2",
    "filepath": "/uploads-documents/1742069585642.pdf",
    "tags": [
      "job",
      "resume",
      "personal"
    ],
    "createdAt": "2025-03-15 20:13:06"
  },
  {
    "id": 10,
    "filename": "Sample1",
    "filepath": "/uploads-documents/default_name.docx",
    "tags": [
      "sample",
      "test"
    ],
    "createdAt": "2025-03-15 20:49:38"
  },
  {
    "id": 11,
    "filename": "example-document",
    "filepath": "/uploads-documents/sample1.docx",
    "tags": [
      "tag1",
      "tag2"
    ],
    "createdAt": "2025-03-15 21:27:56"
  },
  {
    "id": 12,
    "filename": "UpdatedSample",
    "filepath": "/uploads-documents/sample2.docx",
    "tags": [
      "test"
    ],
    "createdAt": "2025-03-15 21:29:11"
  },
  {
    "id": 13,
    "filename": "picture",
    "filepath": "/uploads-documents/mockup2.png",
    "tags": [
      "design"
    ],
    "createdAt": "2025-03-15 21:30:06"
  },
  {
    "id": 14,
    "filename": "new",
    "filepath": "/uploads-documents/sample1.docx",
    "tags": [
      "new"
    ],
    "createdAt": "2025-03-15 21:30:50"
  },
  {
    "id": 15,
    "filename": "test_resume1",
    "filepath": "/uploads-documents/test_resume1.pdf",
    "tags": [
      "test",
      "resume",
      "sample"
    ],
    "createdAt": "2025-03-16 01:39:31"
  },
  {
    "id": 16,
    "filename": "test_resume2",
    "filepath": "/uploads-documents/test_resume2.pdf",
    "tags": [
      "test",
      "resume"
    ],
    "createdAt": "2025-03-16 01:40:20"
  },
  {
    "id": 17,
    "filename": "test_resume3",
    "filepath": "/uploads-documents/test_resume3.pdf",
    "tags": [
      "test3",
      "resume3"
    ],
    "createdAt": "2025-03-16 01:50:29"
  },
  {
    "id": 18,
    "filename": "testing1",
    "filepath": "/uploads-documents/testing1.docx",
    "tags": [
      "tes1"
    ],
    "createdAt": "2025-03-16 02:00:45"
  },
  {
    "id": 19,
    "filename": "image2",
    "filepath": "/uploads-documents/image2.png",
    "tags": [
      "image",
      "picture"
    ],
    "createdAt": "2025-03-16 01:31:36"
  },
  {
    "id": 21,
    "filename": "preview_test",
    "filepath": "/uploads-documents/preview_test.docx",
    "tags": [
      "preview",
      "test"
    ],
    "createdAt": "2025-03-16 17:16:43"
  },
  {
    "id": 22,
    "filename": "HELLOEVERYONEHOWAREYOU",
    "filepath": "/uploads-documents/HELLOEVERYONEHOWAREYOU.docx",
    "tags": [
      "preview",
      "test"
    ],
    "createdAt": "2025-03-16 17:26:41"
  },
  {
    "id": 23,
    "filename": "AAAAAAAAAAAAAAAAAAAAA",
    "filepath": "/uploads-documents/AAAAAAAAAAAAAAAAAAAAA.docx",
    "tags": [
      "a",
      "a"
    ],
    "createdAt": "2025-03-16 17:43:39"
  },
  {
    "id": 24,
    "filename": "aaaaaaaaaaaaaa",
    "filepath": "/uploads-documents/aaaaaaaaaaaaaa.docx",
    "tags": [
      "a",
      "a"
    ],
    "createdAt": "2025-03-16 17:44:26"
  },
  {
    "id": 25,
    "filename": "rrrrrrrrrrrrrrrrrrrrrrrrrr",
    "filepath": "/uploads-documents/rrrrrrrrrrrrrrrrrrrrrrrrrr.pdf",
    "tags": [
      "r",
      "test"
    ],
    "createdAt": "2025-03-16 17:54:22"
  },
  {
    "id": 26,
    "filename": "mmmmmmmmmmmmm",
    "filepath": "/uploads-documents/mmmmmmmmmmmmm.png",
    "tags": [
      "m",
      "teat"
    ],
    "createdAt": "2025-03-16 17:57:11"
  },
  {
    "id": 27,
    "filename": "vvvvvvvvvvvvvvvvvvvvv",
    "filepath": "/uploads-documents/vvvvvvvvvvvvvvvvvvvvv.png",
    "tags": [
      "b",
      "m"
    ],
    "createdAt": "2025-03-16 18:08:21"
  },
  {
    "id": 28,
    "filename": "lllllllllllllllllllllllllllllllll",
    "filepath": "/uploads-documents/lllllllllllllllllllllllllllllllll.docx",
    "tags": [
      "l",
      "l"
    ],
    "createdAt": "2025-03-16 18:12:23"
  },
  {
    "id": 29,
    "filename": "aaaaaa",
    "filepath": "/uploads-documents/aaaaaa.pdf",
    "tags": [
      "a",
      "a"
    ],
    "createdAt": "2025-03-16 18:18:30"
  },
  {
    "id": 30,
    "filename": "bbbbbbbbbbbbbb",
    "filepath": "/uploads-documents/bbbbbbbbbbbbbb.docx",
    "tags": [
      "b"
    ],
    "createdAt": "2025-03-16 18:39:46"
  },
  {
    "id": 31,
    "filename": "cccccccccc",
    "filepath": "/uploads-documents/cccccccccc.docx",
    "tags": [
      "cc"
    ],
    "createdAt": "2025-03-16 18:44:50"
  },
  {
    "id": 32,
    "filename": "dddddddddddd",
    "filepath": "/uploads-documents/dddddddddddd.pdf",
    "tags": [
      "resume",
      "job"
    ],
    "createdAt": "2025-03-17 13:15:58"
  },
  {
    "id": 33,
    "filename": "eeeeeeee",
    "filepath": "/uploads-documents/eeeeeeee.png",
    "tags": [
      "image"
    ],
    "createdAt": "2025-03-17 14:07:58"
  },
  {
    "id": 34,
    "filename": "sampleeeeeee",
    "filepath": "/uploads-documents/sampleeeeeee.docx",
    "tags": [
      "sample",
      "a"
    ],
    "createdAt": "2025-03-17 14:28:32"
  },
  {
    "id": 35,
    "filename": "rrrrrr",
    "filepath": "/uploads-documents/rrrrrr.pdf",
    "tags": [
      "r"
    ],
    "createdAt": "2025-03-17 14:45:53"
  },
  {
    "id": 36,
    "filename": "mockup22222",
    "filepath": "/uploads-documents/mockup22222.png",
    "tags": [
      "image",
      "222"
    ],
    "createdAt": "2025-03-17 15:06:58"
  },
  {
    "id": 37,
    "filename": "resume3333333",
    "filepath": "/uploads-documents/resume3333333.pdf",
    "tags": [
      "resume",
      "222"
    ],
    "createdAt": "2025-03-17 15:17:57"
  },
  {
    "id": 38,
    "filename": "resume4444",
    "filepath": "/uploads-documents/resume4444.pdf",
    "tags": [
      "resume",
      "444"
    ],
    "createdAt": "2025-03-17 15:18:54"
  },
  {
    "id": 39,
    "filename": "mockup555",
    "filepath": "/uploads-documents/mockup555.png",
    "tags": [
      "5"
    ],
    "createdAt": "2025-03-17 15:36:56"
  },
  {
    "id": 40,
    "filename": "mockup66666",
    "filepath": "/uploads-documents/mockup66666.png",
    "tags": [
      "6"
    ],
    "createdAt": "2025-03-17 16:05:59"
  },
  {
    "id": 41,
    "filename": "sample777",
    "filepath": "/uploads-documents/sample777.docx",
    "tags": [
      "7"
    ],
    "createdAt": "2025-03-17 16:27:09"
  },
  {
    "id": 42,
    "filename": "mockup888",
    "filepath": "/uploads-documents/mockup888.png",
    "tags": [
      "8"
    ],
    "createdAt": "2025-03-17 16:34:46"
  },
  {
    "id": 43,
    "filename": "mockup9999",
    "filepath": "/uploads-documents/mockup9999.png",
    "tags": [
      "9"
    ],
    "createdAt": "2025-03-17 16:43:05"
  },
  {
    "id": 47,
    "filename": "resume1311313",
    "filepath": "/uploads-documents/resume1311313.pdf",
    "tags": [
      "1313"
    ],
    "createdAt": "2025-03-17 17:39:10"
  }
]);
};