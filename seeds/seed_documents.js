/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("documents").del();
  await knex("documents").insert([
    {
      id: 1,
      filename: "project-plan.docx",
      filepath: "/uploads/project-plan.docx",
      tags: JSON.stringify(["work", "document"]),
      createdAt: "2025-03-12 11:00:00",
    },
    {
      id: 2,
      filename: "resume.pdf",
      filepath: "/uploads/resume.pdf",
      tags: JSON.stringify(["personal", "pdf"]),
      createdAt: "2025-03-13 12:00:00",
    },
    {
      id: 3,
      filename: "presentation.pptx",
      filepath: "/uploads/presentation.pptx",
      tags: JSON.stringify(["work", "presentation"]),
      createdAt: "2025-03-15 14:00:00",
    },
    {
      id: 4,
      filename: "notes.txt",
      filepath: "/uploads/notes.txt",
      tags: JSON.stringify(["personal", "text"]),
      createdAt: "2025-03-20 19:00:00",
    },
    {
      id: 5,
      filename: "assignment.pdf",
      filepath: "/uploads/assignment.pdf",
      tags: JSON.stringify(["personal", "pdf"]),
      createdAt: "2025-03-23 22:00:00",
    },
    {
      id: 6,
      filename: "mockup.png",
      filepath: "/uploads/mockup.jpg",
      tags: JSON.stringify(["work", "design"]),
      createdAt: "2025-03-17 16:00:00",
    },
    {
      id: 7,
      filename: "invoice.pdf",
      filepath: "/uploads/invoice.pdf",
      tags: JSON.stringify(["work", "finance"]),
      createdAt: "2025-03-16 15:00:00",
    },
  ]);
}
