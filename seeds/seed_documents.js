/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Remove only rows that match the seed data to prevent duplicates
  await knex("documents")
    .where("filename", "project-plan.docx")
    .orWhere("filename", "resume.pdf")

    .orWhere("filename", "notes.txt")
    .orWhere("filename", "assignment.pdf")
    .orWhere("filename", "mockup.png")

    .orWhere("filename", "Updated Resume")
    .del();

  // Inserts seed entries
  await knex("documents").insert([
    {
      filename: "project-plan.docx",
      filepath: "/uploads-documents/project-plan.docx",
      tags: knex.raw("?", [JSON.stringify(["work", "document"])]), // Correct JSON format
      createdAt: "2025-03-12 15:00:00",
    },
    {
      filename: "resume.pdf",
      filepath: "/uploads-documents/resume.pdf",
      tags: knex.raw("?", [JSON.stringify(["personal", "pdf"])]), // Correct JSON format
      createdAt: "2025-03-13 16:00:00",
    },
    {
      filename: "notes.txt",
      filepath: "/uploads-documents/notes.txt",
      tags: knex.raw("?", [JSON.stringify(["personal", "text"])]), // Correct JSON format
      createdAt: "2025-03-16 18:22:52",
    },
    {
      filename: "assignment.pdf",
      filepath: "/uploads-documents/assignment.pdf",
      tags: knex.raw("?", [JSON.stringify(["personal", "pdf"])]), // Correct JSON format
      createdAt: "2025-03-16 18:22:52",
    },
    {
      filename: "mockup.png",
      filepath: "/uploads-documents/mockup.jpg",
      tags: knex.raw("?", [JSON.stringify(["work", "design"])]), // Correct JSON format
      createdAt: "2025-03-16 18:22:52",
    },
    {
      filename: "Updated Resume",
      filepath: "/uploads-documents/1742066692333.pdf",
      tags: knex.raw("?", [JSON.stringify(["job", "resume"])]), // Correct JSON format
      createdAt: "2025-03-15 19:24:52",
    },
  ]);
}
