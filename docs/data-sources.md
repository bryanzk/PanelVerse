# Top 100 Graphic Novels - 数据源和导入方案

## 📊 推荐的数据源组合

### 方案 A：精选人工整理列表 + API 自动填充（推荐）⭐

**优势**：质量最高，数据最完整，符合 Graphic Novel 定位

#### 数据来源：

1. **权威排行榜** - 人工整理书单
2. **Google Books API** - 自动获取元数据
3. **Open Library API** - 备用补充数据

---

## 🏆 Top 100 Graphic Novels 精选列表

基于多个权威来源（Goodreads、编辑推荐、读者投票），我整理了以下经典作品：

### 核心经典（必收录）

1. **Watchmen** - Alan Moore, Dave Gibbons
2. **Maus** - Art Spiegelman (普利策奖)
3. **The Sandman** (系列) - Neil Gaiman
4. **Batman: The Dark Knight Returns** - Frank Miller
5. **Persepolis** - Marjane Satrapi
6. **V for Vendetta** - Alan Moore, David Lloyd
7. **From Hell** - Alan Moore, Eddie Campbell
8. **Batman: Year One** - Frank Miller, David Mazzucchelli
9. **The Killing Joke** - Alan Moore, Brian Bolland
10. **Saga** (系列) - Brian K. Vaughan, Fiona Staples

### 现代经典

11. **Y: The Last Man** (系列) - Brian K. Vaughan
12. **Fun Home** - Alison Bechdel
13. **Blankets** - Craig Thompson
14. **Ghost World** - Daniel Clowes
15. **Jimmy Corrigan: The Smartest Kid on Earth** - Chris Ware
16. **Bone** (系列) - Jeff Smith
17. **All-Star Superman** - Grant Morrison, Frank Quitely
18. **Scott Pilgrim** (系列) - Bryan Lee O'Malley
19. **The Walking Dead** (系列) - Robert Kirkman
20. **Fables** (系列) - Bill Willingham

### 日本漫画经典

21. **Akira** - Katsuhiro Otomo
22. **Death Note** - Tsugumi Ohba, Takeshi Obata
23. **Fullmetal Alchemist** - Hiromu Arakawa
24. **Monster** - Naoki Urasawa
25. **One Piece** - Eiichiro Oda
26. **Naruto** - Masashi Kishimoto
27. **Attack on Titan** - Hajime Isayama
28. **My Hero Academia** - Kohei Horikoshi
29. **Berserk** - Kentaro Miura
30. **Vagabond** - Takehiko Inoue

### 超级英雄经典

31. **Kingdom Come** - Mark Waid, Alex Ross
32. **Batman: The Long Halloween** - Jeph Loeb, Tim Sale
33. **Spider-Man: Kraven's Last Hunt** - J.M. DeMatteis
34. **X-Men: Days of Future Past** - Chris Claremont
35. **Civil War** - Mark Millar
36. **The Dark Phoenix Saga** - Chris Claremont
37. **Superman: Red Son** - Mark Millar
38. **Hawkeye** (Matt Fraction) - Matt Fraction, David Aja
39. **Ms. Marvel** (Kamala Khan) - G. Willow Wilson
40. **Black Panther** (Ta-Nehisi Coates) - Ta-Nehisi Coates

### 独立与艺术作品

41. **American Born Chinese** - Gene Luen Yang
42. **March** (三部曲) - John Lewis, Andrew Aydin
43. **Persepolis 2** - Marjane Satrapi
44. **Stitches** - David Small
45. **Building Stories** - Chris Ware
46. **Habibi** - Craig Thompson
47. **Daytripper** - Gabriel Bá, Fábio Moon
48. **Black Hole** - Charles Burns
49. **The Arrival** - Shaun Tan
50. **Asterios Polyp** - David Mazzucchelli

### 科幻/奇幻

51. **Transmetropolitan** - Warren Ellis
52. **Preacher** - Garth Ennis
53. **Hellboy** - Mike Mignola
54. **The Incal** - Alejandro Jodorowsky, Moebius
55. **Descender** - Jeff Lemire
56. **Paper Girls** - Brian K. Vaughan
57. **East of West** - Jonathan Hickman
58. **Locke & Key** - Joe Hill
59. **Nimona** - ND Stevenson
60. **Gideon Falls** - Jeff Lemire

### 恐怖/悬疑

61. **The Walking Dead: Compendium 1** - Robert Kirkman
62. **30 Days of Night** - Steve Niles
63. **Uzumaki** - Junji Ito
64. **The Wicked + The Divine** - Kieron Gillen
65. **Harrow County** - Cullen Bunn
66. **Through the Woods** - Emily Carroll
67. **Something is Killing the Children** - James Tynion IV
68. **Infidel** - Pornsak Pichetshote
69. **Wytches** - Scott Snyder
70. **Revival** - Tim Seeley

### 传记/非虚构

71. **March: Book One** - John Lewis
72. **Can't We Talk About Something More Pleasant?** - Roz Chast
73. **Persepolis: The Story of a Childhood** - Marjane Satrapi
74. **A Contract with God** - Will Eisner
75. **Palestine** - Joe Sacco
76. **Safe Area Goražde** - Joe Sacco
77. **Good Talk** - Mira Jacob
78. **The Best We Could Do** - Thi Bui
79. **They Called Us Enemy** - George Takei
80. **Becoming Unbecoming** - Una

### 情感/浪漫

81. **Blue is the Warmest Color** - Julie Maroh
82. **My Love Story!!** - Kazune Kawahara
83. **Heartstopper** - Alice Oseman
84. **On a Sunbeam** - Tillie Walden
85. **Check, Please!** - Ngozi Ukazu
86. **This One Summer** - Mariko Tamaki
87. **Laura Dean Keeps Breaking Up with Me** - Mariko Tamaki
88. **Bloom** - Kevin Panetta
89. **The Prince and the Dressmaker** - Jen Wang
90. **Fence** - C.S. Pacat

### 其他杰作

91. **Sin City** - Frank Miller
92. **300** - Frank Miller
93. **Understanding Comics** - Scott McCloud
94. **The Invisibles** - Grant Morrison
95. **League of Extraordinary Gentlemen** - Alan Moore
96. **Planetary** - Warren Ellis
97. **B.P.R.D.** - Mike Mignola
98. **Criminal** - Ed Brubaker
99. **Pride of Baghdad** - Brian K. Vaughan
100. **The Vision** - Tom King

---

## 🔧 数据获取方案

### 方法 1：Google Books API（推荐）

**优势**：
- 免费（每天 1000 次请求）
- 数据质量高
- 封面图片清晰
- 包含 ISBN、描述等完整信息

**API 示例**：

```javascript
// 通过书名和作者搜索
async function fetchBookFromGoogle(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const apiKey = 'YOUR_GOOGLE_BOOKS_API_KEY';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.items && data.items.length > 0) {
    const book = data.items[0].volumeInfo;
    return {
      title: book.title,
      author: book.authors?.[0] || author,
      isbn: book.industryIdentifiers?.[0]?.identifier,
      coverUrl: book.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=2'), // 高清封面
      description: book.description,
      publisher: book.publisher,
      publishedDate: book.publishedDate,
      pageCount: book.pageCount,
      categories: book.categories || [],
      externalId: data.items[0].id,
      externalSource: 'google_books'
    };
  }
  return null;
}

// 使用示例
const watchmen = await fetchBookFromGoogle('Watchmen', 'Alan Moore');
```

**获取 API Key**：
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目
3. 启用 "Books API"
4. 创建凭据 → API 密钥
5. 限制密钥仅用于 Books API（安全考虑）

---

### 方法 2：Open Library API（备用）

**优势**：
- 完全免费，无限制
- 覆盖范围广
- 开放数据

**API 示例**：

```javascript
async function fetchBookFromOpenLibrary(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,isbn,cover_i,first_publish_year,publisher,number_of_pages`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.docs && data.docs.length > 0) {
    const book = data.docs[0];
    return {
      title: book.title,
      author: book.author_name?.[0] || author,
      isbn: book.isbn?.[0],
      coverUrl: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      publishedDate: book.first_publish_year?.toString(),
      publisher: book.publisher?.[0],
      pageCount: book.number_of_pages,
      externalId: book.key,
      externalSource: 'open_library'
    };
  }
  return null;
}
```

---

## 📥 批量导入脚本

### Node.js 导入脚本

```javascript
// import-top-100.js
const fs = require('fs');

const TOP_100_BOOKS = [
  { title: 'Watchmen', author: 'Alan Moore', categories: ['Superhero', 'Mystery'], tags: ['noir', 'deconstruction'] },
  { title: 'Maus', author: 'Art Spiegelman', categories: ['Biography', 'Historical'], tags: ['holocaust', 'memoir'] },
  // ... 其余 98 本
];

async function importBooks() {
  const results = [];
  
  for (const bookInfo of TOP_100_BOOKS) {
    console.log(`Fetching: ${bookInfo.title}...`);
    
    // 优先尝试 Google Books
    let bookData = await fetchBookFromGoogle(bookInfo.title, bookInfo.author);
    
    // 如果失败，尝试 Open Library
    if (!bookData) {
      console.log(`  → Trying Open Library...`);
      bookData = await fetchBookFromOpenLibrary(bookInfo.title, bookInfo.author);
    }
    
    if (bookData) {
      // 合并人工整理的分类和标签
      bookData.categories = bookInfo.categories || [];
      bookData.tags = bookInfo.tags || [];
      bookData.isGraphicNovel = true;
      
      results.push(bookData);
      console.log(`  ✓ Success`);
    } else {
      console.log(`  ✗ Failed`);
      // 至少保存基础信息
      results.push({
        title: bookInfo.title,
        author: bookInfo.author,
        categories: bookInfo.categories || [],
        tags: bookInfo.tags || [],
        isGraphicNovel: true
      });
    }
    
    // 避免触发 API 限制
    await sleep(500);
  }
  
  // 保存为 JSON
  fs.writeFileSync('top-100-graphic-novels.json', JSON.stringify(results, null, 2));
  console.log(`\n✓ Imported ${results.length} books`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

importBooks();
```

---

## 🗃️ 数据库导入

### SQL 导入脚本

```sql
-- 1. 插入书籍
INSERT INTO books (id, title, author, isbn, cover_url, description, publisher, 
                   publish_date, page_count, is_graphic_novel, external_id, external_source)
VALUES 
  ('uuid-1', 'Watchmen', 'Alan Moore', '9780930289232', 
   'https://...', '...', 'DC Comics', '1987', 416, 1, 'google-id-1', 'google_books'),
  -- ... 更多书籍
;

-- 2. 插入分类
INSERT INTO categories (id, name, slug)
VALUES 
  ('cat-1', '侦探', 'detective'),
  ('cat-2', '情感', 'romance'),
  ('cat-3', '非虚构', 'non-fiction'),
  ('cat-4', '传记', 'biography'),
  ('cat-5', '科幻', 'sci-fi'),
  ('cat-6', '奇幻', 'fantasy'),
  ('cat-7', '超级英雄', 'superhero'),
  ('cat-8', '恐怖', 'horror'),
  ('cat-9', '历史', 'historical')
;

-- 3. 关联书籍和分类
INSERT INTO book_categories (book_id, category_id)
VALUES 
  ('uuid-1', 'cat-7'), -- Watchmen -> Superhero
  ('uuid-1', 'cat-1'), -- Watchmen -> Detective
  -- ...
;

-- 4. 插入标签
INSERT INTO tags (id, name, slug)
VALUES 
  ('tag-1', 'noir', 'noir'),
  ('tag-2', 'deconstruction', 'deconstruction'),
  -- ...
;

-- 5. 关联书籍和标签
INSERT INTO book_tags (book_id, tag_id)
VALUES 
  ('uuid-1', 'tag-1'),
  ('uuid-1', 'tag-2'),
  -- ...
;

-- 6. 初始化统计数据
INSERT INTO book_stats (book_id, read_count, want_to_read_count, rating_avg, rating_count)
SELECT id, 0, 0, 0, 0 FROM books;
```

---

## 🚀 实施步骤

### Phase 1: 准备工作

1. **获取 API Key**
   ```bash
   # Google Books API
   # 访问: https://console.cloud.google.com/
   # 启用 Books API，创建 API Key
   ```

2. **创建书单 CSV**（可选，便于编辑）
   ```csv
   title,author,category1,category2,tag1,tag2,tag3
   Watchmen,Alan Moore,Superhero,Mystery,noir,deconstruction,dystopian
   Maus,Art Spiegelman,Biography,Non-fiction,holocaust,memoir,historical
   ```

### Phase 2: 批量获取数据

```bash
# 安装依赖
npm install node-fetch csv-parser uuid

# 运行导入脚本
node import-top-100.js

# 输出: top-100-graphic-novels.json
```

### Phase 3: 导入到数据库

```bash
# 使用 Cloudflare D1
wrangler d1 execute graphic-novels-db --file=./seed-top-100.sql

# 或使用 Node.js 脚本
node seed-database.js
```

### Phase 4: 验证

```sql
-- 检查导入的书籍数量
SELECT COUNT(*) FROM books;

-- 检查有封面的书籍
SELECT COUNT(*) FROM books WHERE cover_url IS NOT NULL;

-- 检查分类分布
SELECT c.name, COUNT(*) as count
FROM categories c
JOIN book_categories bc ON c.id = bc.category_id
GROUP BY c.id
ORDER BY count DESC;
```

---

## 📊 数据质量预期

基于 Google Books API：
- ✅ **封面图片**: ~95% 成功率
- ✅ **完整描述**: ~90% 成功率
- ✅ **ISBN**: ~85% 成功率
- ✅ **出版信息**: ~98% 成功率

对于缺失的数据：
- 可以后台异步补充
- 允许用户编辑完善
- 使用 Open Library 作为备用

---

## 🎁 额外福利

### 自动生成分类建议

基于 Google Books API 返回的 `categories` 字段，可以智能映射：

```javascript
function mapCategoryToOurs(googleCategories) {
  const mapping = {
    'Comics & Graphic Novels': 'general',
    'Fiction / Mystery': 'detective',
    'Biography': 'biography',
    'History': 'historical',
    'Science Fiction': 'sci-fi',
    'Fantasy': 'fantasy',
    // ...
  };
  
  return googleCategories
    .map(cat => mapping[cat] || null)
    .filter(Boolean);
}
```

### 自动生成标签

从描述中提取关键词：

```javascript
function extractTags(description) {
  const keywords = ['superhero', 'noir', 'romance', 'thriller', 'memoir', ...];
  const found = [];
  
  keywords.forEach(keyword => {
    if (description.toLowerCase().includes(keyword)) {
      found.push(keyword);
    }
  });
  
  return found;
}
```

---

## 💡 下一步建议

我可以为您：

1. **立即创建完整的导入脚本**（包含完整的 Top 100 列表）
2. **测试 API 调用**（验证 Google Books API 的数据质量）
3. **生成 SQL seed 文件**（直接可用于数据库初始化）
4. **创建 CSV 模板**（便于您编辑和补充）

您希望我先做哪一个？或者您对这个方案有什么疑问或调整建议？
