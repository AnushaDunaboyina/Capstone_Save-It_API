/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("notes").del();

  // Inserts seed entries
  await knex("notes").insert([
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed project timeline and milestones.",
      tags: knex.raw('?', [JSON.stringify(["work", "meeting"])]), // Explicit JSON
      createdAt: "2025-03-11 10:00:00",
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, Bread, Eggs, Butter.",
      tags: knex.raw('?', [JSON.stringify(["personal", "shopping"])]), // Explicit JSON
      createdAt: "2025-03-12 09:00:00",
    },
    {
      id: 3,
      title: "To-Do List",
      content: "Finish report, Call John, Plan weekend trip.",
      tags: knex.raw('?', [JSON.stringify(["personal", "tasks"])]), // Explicit JSON
      createdAt: "2025-03-13 08:30:00",
    },
    {
      id: 4,
      title: "Project Ideas",
      content: "Brainstorming new project ideas for Q2.",
      tags: knex.raw('?', [JSON.stringify(["work", "ideas"])]), // Explicit JSON
      createdAt: "2025-03-14 11:00:00",
    },
    {
      id: 5,
      title: "Book Summary",
      content: "Summary of 'Atomic Habits' by James Clear.",
      tags: knex.raw('?', [JSON.stringify(["personal", "reading"])]), // Explicit JSON
      createdAt: "2025-03-15 12:00:00",
    },
  ]);
}
