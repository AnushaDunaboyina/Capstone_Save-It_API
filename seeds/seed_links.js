/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("links").del();

  // Inserts seed entries
  await knex("links").insert([
    {
      id: 1,
      url: "http://roadmap.sh/",
      title: "Developer Roadmaps",
      description: "Curated roadmaps for developers to follow.",
      thumbnail: "http://roadmap.sh/thumbnail.jpg",
      tags: knex.raw('?', [JSON.stringify(["development", "roadmap"])]), // Explicitly convert to JSON
      createdAt: "2025-03-11 10:00:00",
    },
    {
      id: 2,
      url: "https://fonts.google.com/",
      title: "Google Fonts",
      description: "Free licensed font families.",
      thumbnail: "https://fonts.google.com/thumbnail.jpg",
      tags: knex.raw('?', [JSON.stringify(["design", "fonts"])]), // Explicitly convert to JSON
      createdAt: "2025-03-12 11:00:00",
    },
    {
      id: 3,
      url: "https://colorhunt.co/palette/",
      title: "Color Hunt Palette",
      description: "Free color palettes for designers and artists.",
      thumbnail: "https://colorhunt.co/thumbnail.jpg",
      tags: knex.raw('?', [JSON.stringify(["design", "colors"])]), // Explicitly convert to JSON
      createdAt: "2025-03-13 12:00:00",
    },
  ]);
}
