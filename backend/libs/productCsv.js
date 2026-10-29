const REQUIRED_COLUMNS = [
  "name",
  "description",
  "category",
  "price",
  "quantity",
];

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  if (quoted) {
    throw new Error("Unclosed quoted value");
  }

  values.push(value.trim());
  return values;
}

function parseProductCsv(csv) {
  const lines = csv
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim());
  if (lines.length < 2) {
    return {
      rows: [],
      errors: [
        {
          row: 1,
          message: "CSV must contain a header and at least one product row.",
        },
      ],
    };
  }

  let headers;
  try {
    headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  } catch (error) {
    return { rows: [], errors: [{ row: 1, message: error.message }] };
  }

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headers.includes(column),
  );
  if (missingColumns.length) {
    return {
      rows: [],
      errors: [
        {
          row: 1,
          message: `Missing required columns: ${missingColumns.join(", ")}.`,
        },
      ],
    };
  }

  const rows = [];
  const errors = [];
  lines.slice(1).forEach((line, index) => {
    const rowNumber = index + 2;
    try {
      const values = parseCsvLine(line);
      if (values.length !== headers.length) {
        throw new Error("Column count does not match the header.");
      }
      const row = Object.fromEntries(
        headers.map((header, valueIndex) => [header, values[valueIndex]]),
      );
      const price = Number(row.price);
      const quantity = Number(row.quantity);

      if (!row.name) throw new Error("Name is required.");
      if (!row.description) throw new Error("Description is required.");
      if (!row.category) throw new Error("Category is required.");
      if (!Number.isFinite(price) || price < 0)
        throw new Error("Price must be a non-negative number.");
      if (!Number.isInteger(quantity) || quantity < 0)
        throw new Error("Quantity must be a non-negative integer.");

      rows.push({
        rowNumber,
        name: row.name,
        description: row.description,
        category: row.category,
        price,
        quantity,
      });
    } catch (error) {
      errors.push({ row: rowNumber, message: error.message });
    }
  });

  return { rows, errors };
}

function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

module.exports = { parseProductCsv, csvEscape };
