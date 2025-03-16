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
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\project-plan.docx",
    "tags": [
      "work",
      "document"
    ],
    "createdAt": "2025-03-12 15:00:00"
  },
  {
    "id": 2,
    "filename": "resume.pdf",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\resume.pdf",
    "tags": [
      "personal",
      "pdf"
    ],
    "createdAt": "2025-03-13 16:00:00"
  },
  {
    "id": 3,
    "filename": "presentation.pptx",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\presentation.pptx",
    "tags": [
      "work",
      "presentation"
    ],
    "createdAt": "2025-03-15 18:00:00"
  },
  {
    "id": 4,
    "filename": "notes.txt",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\notes.txt",
    "tags": [
      "personal",
      "text"
    ],
    "createdAt": "2025-03-20 23:00:00"
  },
  {
    "id": 5,
    "filename": "assignment.pdf",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\assignment.pdf",
    "tags": [
      "personal",
      "pdf"
    ],
    "createdAt": "2025-03-24 02:00:00"
  },
  {
    "id": 6,
    "filename": "mockup.png",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\mockup.jpg",
    "tags": [
      "work",
      "design"
    ],
    "createdAt": "2025-03-17 20:00:00"
  },
  {
    "id": 7,
    "filename": "invoice.pdf",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\invoice.pdf",
    "tags": [
      "work",
      "finance"
    ],
    "createdAt": "2025-03-16 19:00:00"
  },
  {
    "id": 8,
    "filename": "Updated Resume",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\1742066692333.pdf",
    "tags": [
      "job",
      "resume"
    ],
    "createdAt": "2025-03-15 19:24:52"
  },
  {
    "id": 9,
    "filename": "Resume2",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\1742069585642.pdf",
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
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\default_name.docx",
    "tags": [
      "sample",
      "test"
    ],
    "createdAt": "2025-03-15 20:49:38"
  },
  {
    "id": 11,
    "filename": "sample",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\sample1.docx",
    "tags": [
      "sample",
      "test"
    ],
    "createdAt": "2025-03-15 21:27:56"
  },
  {
    "id": 12,
    "filename": "UpdatedSample",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\sample2.docx",
    "tags": [
      "test"
    ],
    "createdAt": "2025-03-15 21:29:11"
  },
  {
    "id": 13,
    "filename": "picture",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\mockup2.png",
    "tags": [
      "design"
    ],
    "createdAt": "2025-03-15 21:30:06"
  },
  {
    "id": 14,
    "filename": "new",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\sample1.docx",
    "tags": [
      "new"
    ],
    "createdAt": "2025-03-15 21:30:50"
  },
  {
    "id": 15,
    "filename": "test_resume1",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\test_resume1.pdf",
    "tags": [
      "test",
      "resume"
    ],
    "createdAt": "2025-03-16 01:39:31"
  },
  {
    "id": 16,
    "filename": "test_resume2",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\test_resume2.pdf",
    "tags": [
      "test",
      "resume"
    ],
    "createdAt": "2025-03-16 01:40:20"
  },
  {
    "id": 17,
    "filename": "test_resume3",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\test_resume3.pdf",
    "tags": [
      "test3",
      "resume3"
    ],
    "createdAt": "2025-03-16 01:50:29"
  },
  {
    "id": 18,
    "filename": "testing1",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\testing1.docx",
    "tags": [
      "tes1"
    ],
    "createdAt": "2025-03-16 02:00:45"
  },
  {
    "id": 19,
    "filename": "image2",
    "filepath": "C:\\Users\\vikas\\OneDrive\\Desktop\\uploads-documents\\image2.png",
    "tags": [
      "image",
      "picture"
    ],
    "createdAt": "2025-03-16 01:31:36"
  }
]);
};