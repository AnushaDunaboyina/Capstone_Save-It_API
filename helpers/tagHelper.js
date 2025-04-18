import fs from "fs";

// parse and validate tags
export const parseAndValidateTags = (tags) => {
  try {
    // Handle arrays directly
    if (Array.isArray(tags)) {
      return tags.map((tag) => tag.trim());
    }

    // Parse JSON strings
    const tagsArray = JSON.parse(tags).map((tag) => tag.trim());

    return tagsArray;
  } catch (error) {
    console.error("Error in parseAndValidateTags:", error.message);
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
      return true; // Success
    });
  }
};
