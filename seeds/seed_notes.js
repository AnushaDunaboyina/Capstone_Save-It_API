/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("notes").del();
  await knex("notes").insert([
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed project timeline and milestones.",
      tags: JSON.stringify(["work", "meeting"]),
      createdAt: "2025-03-11 10:00:00"
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, Bread, Eggs, Butter.",
      tags: JSON.stringify(["personal", "shopping"]),
      createdAt: "2025-03-12 09:00:00"
    },
    {
      id: 3,
      title: "To-Do List",
      content: "Finish report, Call John, Plan weekend trip.",
      tags: JSON.stringify(["personal", "tasks"]),
      createdAt: "2025-03-13 08:30:00"
    },
    {
      id: 4,
      title: "Project Ideas",
      content: "Brainstorming new project ideas for Q2.",
      tags: JSON.stringify(["work", "ideas"]),
      createdAt: "2025-03-14 11:00:00"
    },
    {
      id: 5,
      title: "Book Summary",
      content: "Summary of 'Atomic Habits' by James Clear.",
      tags: JSON.stringify(["personal", "reading"]),
      createdAt: "2025-03-15 12:00:00"
    },
    {
      id: 6,
      title: "Recipe Notes",
      content: "Ingredients and steps for making pasta.",
      tags: JSON.stringify(["personal", "cooking"]),
      createdAt: "2025-03-16 13:00:00"
    },
    {
      id: 7,
      title: "Workout Plan",
      content: "Weekly workout plan including cardio and strength training.",
      tags: JSON.stringify(["personal", "fitness"]),
      createdAt: "2025-03-17 14:00:00"
    },
    {
      id: 8,
      title: "Travel Itinerary",
      content: "Travel plans and reservations for the upcoming trip to Japan.",
      tags: JSON.stringify(["personal", "travel"]),
      createdAt: "2025-03-18 15:00:00"
    },
    {
      id: 9,
      title: "Conference Notes",
      content: "Key takeaways from the tech conference.",
      tags: JSON.stringify(["work", "conference"]),
      createdAt: "2025-03-19 16:00:00"
    },
    {
      id: 10,
      title: "Daily Journal",
      content: "Reflections and thoughts for the day.",
      tags: JSON.stringify(["personal", "journal"]),
      createdAt: "2025-03-20 17:00:00"
    },
    {
      id: 11,
      title: "Capstone Check-in Meeting",
      content: "Notes from the meeting with the lecturer.",
      tags: JSON.stringify(["work", "project"]),
      createdAt: "2025-03-21 18:00:00"
    },
  ]);
};
