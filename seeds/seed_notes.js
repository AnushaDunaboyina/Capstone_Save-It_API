/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Inserts seed entries
  await knex("notes").insert([
    {
      title: "Recipe Notes",
      content: "Ingredients and steps for making pasta.",
      tags: knex.raw("?", [JSON.stringify(["personal", "cooking"])]),
      createdAt: "2025-03-16 13:00:00",
    },
    {
      title: "Workout Plan",
      content: "Weekly workout plan including cardio and strength training.",
      tags: knex.raw("?", [JSON.stringify(["personal", "fitness"])]),
      createdAt: "2025-03-17 14:00:00",
    },
    {
      title: "Travel Itinerary",
      content: "Travel plans and reservations for the upcoming trip to Japan.",
      tags: knex.raw("?", [JSON.stringify(["personal", "travel"])]),
      createdAt: "2025-03-18 15:00:00",
    },
    {
      title: "Conference Notes",
      content: "Key takeaways from the tech conference.",
      tags: knex.raw("?", [JSON.stringify(["work", "conference"])]),
      createdAt: "2025-03-19 16:00:00",
    },
    {
      title: "Daily Journal",
      content: "Reflections and thoughts for the day.",
      tags: knex.raw("?", [JSON.stringify(["personal", "journal"])]),
      createdAt: "2025-03-20 17:00:00",
    },
    {
      title: "Capstone Check-in Meeting",
      content: "Notes from the meeting with the lecturer.",
      tags: knex.raw("?", [JSON.stringify(["work", "project"])]),
      createdAt: "2025-03-21 18:00:00",
    },
  ]);
}
