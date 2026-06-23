import { NextResponse } from "next/server";
import { query, getAllBooks, getBookBySlug } from "@/lib/db";

// GET handler: Fetch all books or a single book by slug
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const result = await getBookBySlug(slug);
      if (!result.book) {
        return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json(result);
    }

    const result = await getAllBooks();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler: Create a new book
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      author,
      isbn,
      year,
      pages,
      size,
      category,
      synopsis,
      coverBg,
      coverTextColor,
      coverImage,
      features,
      previewGallery,
    } = body;

    // Validation
    if (!slug || !title || !author || !isbn || !year || !pages || !size || !category || !synopsis) {
      return NextResponse.json(
        { error: "Semua kolom wajib diisi kecuali penyesuaian warna cover." },
        { status: 400 }
      );
    }

    // Check database connection and write
    const featuresStr = JSON.stringify(Array.isArray(features) ? features : []);
    const previewGalleryStr = JSON.stringify(Array.isArray(previewGallery) ? previewGallery : []);

    const sql = `
      INSERT INTO katalog (slug, title, author, isbn, year, pages, size, category, synopsis, coverBg, coverTextColor, coverImage, features, previewGallery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      slug.trim().toLowerCase(),
      title,
      author,
      isbn,
      parseInt(year),
      parseInt(pages),
      size || "14.8 x 21 cm",
      category,
      synopsis,
      coverBg || "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)",
      coverTextColor || "text-white",
      coverImage || null,
      featuresStr,
      previewGalleryStr,
    ];

    const { data, fallback, error } = await query(sql, params);

    if (fallback) {
      return NextResponse.json(
        {
          error: "Gagal menyimpan.",
          isFallback: true,
          details: error,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Buku berhasil ditambahkan!",
      insertId: data.insertId,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT handler: Update an existing book
export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      id,
      slug,
      title,
      author,
      isbn,
      year,
      pages,
      size,
      category,
      synopsis,
      coverBg,
      coverTextColor,
      coverImage,
      features,
      previewGallery,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID Buku diperlukan untuk melakukan update" }, { status: 400 });
    }

    const featuresStr = JSON.stringify(Array.isArray(features) ? features : []);
    const previewGalleryStr = JSON.stringify(Array.isArray(previewGallery) ? previewGallery : []);

    const sql = `
      UPDATE katalog 
      SET slug = ?, title = ?, author = ?, isbn = ?, year = ?, pages = ?, size = ?, category = ?, synopsis = ?, coverBg = ?, coverTextColor = ?, coverImage = ?, features = ?, previewGallery = ?
      WHERE id = ?
    `;
    const params = [
      slug.trim().toLowerCase(),
      title,
      author,
      isbn,
      parseInt(year),
      parseInt(pages),
      size || "14.8 x 21 cm",
      category,
      synopsis,
      coverBg,
      coverTextColor,
      coverImage || null,
      featuresStr,
      previewGalleryStr,
      parseInt(id),
    ];

    const { data, fallback, error } = await query(sql, params);

    if (fallback) {
      return NextResponse.json(
        {
          error: "Gagal memperbarui.",
          isFallback: true,
          details: error,
        },
        { status: 503 }
      );
    }

    if (data.affectedRows === 0) {
      return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Buku berhasil diperbarui!",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE handler: Remove a book by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID Buku diperlukan untuk melakukan penghapusan" }, { status: 400 });
    }

    const sql = "DELETE FROM katalog WHERE id = ?";
    const { data, fallback, error } = await query(sql, [parseInt(id)]);

    if (fallback) {
      return NextResponse.json(
        {
          error: "Gagal menghapus.",
          isFallback: true,
          details: error,
        },
        { status: 503 }
      );
    }

    if (data.affectedRows === 0) {
      return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Buku berhasil dihapus.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
