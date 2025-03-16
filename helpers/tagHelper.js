import fs from "fs";

// parse and validate tags
export const parseAndValidateTags = (tags) => {
  try {
    console.log("Raw tags input:", tags);
    const tagsArray = JSON.parse(tags).map((tag) => tag.trim());
    console.log("Parsed and trimmed tags:", tagsArray);

    if (!Array.isArray(tagsArray)) {
      throw new Error("Tags must be an array.");
    }
    return tagsArray;
  } catch (error) {
    throw new Error("Tags must be a valid JSON array.");
  }
};

// Safely delete a file (id needed during validation cleanup)
export const safelyDeleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file at ${filePath}:`, err);
        return false; // Failure
      }
      console.log(`Successfully deleted file at ${filePath}`);
      return true; // Success
    });
  }
};
