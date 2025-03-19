export const removeDuplicates = (input) => {
  let duplicates = 0;

  if (typeof input[0] === "string") {
    const uniqueStrings = Array.from(new Set(input));
    duplicates = input.length - uniqueStrings.length;

    return { uniqueStrings, duplicates };
  } else if (typeof input[0] === "object") {
    const seenNames = new Set();

    const uniqueObjects = input.filter((obj) => {
      if (seenNames.has(obj.name)) return false;
      seenNames.add(obj.name);
      return true;
    });
    duplicates = input.length - uniqueObjects.length;

    return { uniqueObjects, duplicates };
  } else {
    throw new Error(
      "Invalid input type. Must be an array of strings or an array of objects with a 'name' property."
    );
  }
};
