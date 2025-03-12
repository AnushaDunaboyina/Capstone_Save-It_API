/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("links").del();
  await knex("links").insert([
    {
      id: 1,
      url: "http://roadmap.sh/",
      title: "Developer Roadmaps",
      description: "Curated roadmaps for developers to follow.",
      thumbnail: "http://roadmap.sh/thumbnail.jpg",
      tags: JSON.stringify(["development", "roadmap"]),
      createdAt: "2025-03-11 10:00:00",
    },
    {
      id: 2,
      url: "https://fonts.google.com/",
      title: "Google Fonts",
      description: "Free licensed font families.",
      thumbnail: "https://fonts.google.com/thumbnail.jpg",
      tags: JSON.stringify(["design", "fonts"]),
      createdAt: "2025-03-12 11:00:00",
    },
    {
      id: 3,
      url: "https://colorhunt.co/palette/",
      title: "Color Hunt Palette",
      description: "Free color palettes for designers and artists.",
      thumbnail: "https://colorhunt.co/thumbnail.jpg",
      tags: JSON.stringify(["design", "colors"]),
      createdAt: "2025-03-13 12:00:00",
    },
    {
      id: 4,
      url: "https://www.npmjs.com/",
      title: "NPM",
      description: "Node package manager for JavaScript.",
      thumbnail: "https://www.npmjs.com/thumbnail.jpg",
      tags: JSON.stringify(["development", "npm"]),
      createdAt: "2025-03-14 13:00:00",
    },
    {
      id: 5,
      url: "https://devhints.io/mysql",
      title: "Devhints MySQL Cheatsheet",
      description: "A collection of MySQL tips and tricks.",
      thumbnail: "https://devhints.io/thumbnail.jpg",
      tags: JSON.stringify(["database", "mysql"]),
      createdAt: "2025-03-15 14:00:00",
    },
    {
      id: 6,
      url: "https://knexjs.org/guide/",
      title: "Knex.js Guide",
      description: "A SQL query builder for JavaScript.",
      thumbnail: "https://knexjs.org/thumbnail.jpg",
      tags: JSON.stringify(["development", "knex"]),
      createdAt: "2025-03-16 15:00:00",
    },
    {
      id: 7,
      url: "https://www.mountaingoatsoftware.com/agile/user-stories",
      title: "Mountain Goat Software - User Stories",
      description: "An explanation of user stories in agile development.",
      thumbnail: "https://www.mountaingoatsoftware.com/thumbnail.jpg",
      tags: JSON.stringify(["agile", "user-stories"]),
      createdAt: "2025-03-17 16:00:00",
    },
    {
      id: 8,
      url: "https://coolors.co/",
      title: "Coolors",
      description: "Generate perfect color combinations.",
      thumbnail: "https://coolors.co/thumbnail.jpg",
      tags: JSON.stringify(["design", "colors"]),
      createdAt: "2025-03-18 17:00:00",
    },
    {
      id: 9,
      url: "https://unsplash.com/",
      title: "Unsplash",
      description:
        "Beautiful, free images and photos that you can download and use for any project.",
      thumbnail: "https://unsplash.com/thumbnail.jpg",
      tags: JSON.stringify(["images", "photos"]),
      createdAt: "2025-03-19 18:00:00",
    },
    {
      id: 10,
      url: "https://thenounproject.com/",
      title: "The Noun Project",
      description: "Icons for everything.",
      thumbnail: "https://thenounproject.com/thumbnail.jpg",
      tags: JSON.stringify(["icons", "design"]),
      createdAt: "2025-03-20 19:00:00",
    },
  ]);
}
