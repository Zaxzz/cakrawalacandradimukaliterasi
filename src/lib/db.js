import mysql from "mysql2/promise";
import staticKatalog from "@/data/katalog.json";

let pool = null;

// Establish database connection pool
export async function getDbConnection() {
  if (pool) return pool;

  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "cakrawala_literasi",
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 3000, // 3 seconds timeout
    });
    return pool;
  } catch (error) {
    console.error("Gagal inisialisasi pool database:", error.message);
    pool = null;
    throw error;
  }
}

// Helper to run query with parameters
export async function query(sql, params = []) {
  try {
    const connection = await getDbConnection();
    const [results] = await connection.execute(sql, params);
    return { data: results, fallback: false };
  } catch (error) {
    console.warn("Database offline / error. Menggunakan fallback katalog.json.", error.message);
    return { data: null, fallback: true, error: error.message };
  }
}

// Fetch all books with unified output structure (ensuring arrays are parsed)
export async function getAllBooks() {
  const { data, fallback, error } = await query(
    "SELECT id, slug, title, author, isbn, year, pages, size, category, synopsis, coverBg, coverTextColor, coverImage, features, previewGallery FROM katalog ORDER BY id DESC"
  );

  if (fallback || !data) {
    // Return static JSON data
    return {
      books: staticKatalog,
      isFallback: true,
      error: error || "Menggunakan data statis",
    };
  }

  // Parse JSON columns if returned as string
  const processedBooks = data.map((book) => {
    let features = [];
    let previewGallery = [];

    try {
      features = typeof book.features === "string" ? JSON.parse(book.features) : (book.features || []);
    } catch (e) {
      features = Array.isArray(book.features) ? book.features : [];
    }

    try {
      previewGallery = typeof book.previewGallery === "string" ? JSON.parse(book.previewGallery) : (book.previewGallery || []);
    } catch (e) {
      previewGallery = Array.isArray(book.previewGallery) ? book.previewGallery : [];
    }

    return {
      ...book,
      features,
      previewGallery,
    };
  });

  return {
    books: processedBooks,
    isFallback: false,
  };
}

// Fetch single book by slug
export async function getBookBySlug(slug) {
  const { data, fallback, error } = await query(
    "SELECT id, slug, title, author, isbn, year, pages, size, category, synopsis, coverBg, coverTextColor, coverImage, features, previewGallery FROM katalog WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (fallback || !data || data.length === 0) {
    // Try finding in static JSON
    const book = staticKatalog.find((b) => b.slug === slug);
    return {
      book: book || null,
      isFallback: true,
      error: error || (book ? "Menggunakan data statis" : "Buku tidak ditemukan"),
    };
  }

  const book = data[0];
  let features = [];
  let previewGallery = [];

  try {
    features = typeof book.features === "string" ? JSON.parse(book.features) : (book.features || []);
  } catch (e) {
    features = Array.isArray(book.features) ? book.features : [];
  }

  try {
    previewGallery = typeof book.previewGallery === "string" ? JSON.parse(book.previewGallery) : (book.previewGallery || []);
  } catch (e) {
    previewGallery = Array.isArray(book.previewGallery) ? book.previewGallery : [];
  }

  return {
    book: {
      ...book,
      features,
      previewGallery,
    },
    isFallback: false,
  };
}
