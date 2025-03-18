/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Inserts seed entries
  await knex("links").insert([
    {
      url: "https://www.mountaingoatsoftware.com/agile/user-stories",
      title: "Mountain Goat Software - User Stories",
      description: "An explanation of user stories in agile development.",
      thumbnail: "https://www.mountaingoatsoftware.com/thumbnail.jpg",
      tags: knex.raw("?", [JSON.stringify(["agile", "user-stories"])]),
      createdAt: "2025-03-17 16:00:00",
    },
    {
      url: "https://coolors.co/",
      title: "Coolors",
      description: "Generate perfect color combinations.",
      thumbnail: "https://coolors.co/thumbnail.jpg",
      tags: knex.raw("?", [JSON.stringify(["design", "colors"])]),
      createdAt: "2025-03-18 17:00:00",
    },
    {
      url: "https://unsplash.com/",
      title: "Unsplash",
      description:
        "Beautiful, free images and photos that you can download and use for any project.",
      thumbnail: "https://unsplash.com/thumbnail.jpg",
      tags: knex.raw("?", [JSON.stringify(["images", "photos"])]),
      createdAt: "2025-03-19 18:00:00",
    },
  ]);
}
