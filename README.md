# 🏫 Govt. Girls High School Kagdana – Complete Website
## Tehsil Nathusari Chopta, District Sirsa, Haryana – 125110
## Email: gghs4700kagdana@gmail.com

---

## 📁 Files Included

| File | Page | Description |
|------|------|-------------|
| `index.html` | Home | Slider, notices, stats, about snippet |
| `about.html` | About | History, timeline, facilities, admission |
| `teachers.html` | Teachers | Faculty profiles (public view) |
| `activities.html` | Activities | Events, notices with category filters |
| `results.html` | Results | Search result + A4 printable card + class-wise view |
| `admin.html` | Admin | Full admin panel (password protected) |
| `style.css` | — | All shared styles (responsive) |
| `common.js` | — | Shared JavaScript utilities |
| `layout.js` | — | Shared header/footer HTML |

---

## 🚀 How to Start

1. **Unzip** all files to a single folder
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. **No server needed** — works completely offline

---

## 🔐 Admin Login

- **URL:** `admin.html`
- **Username:** `admin`
- **Password:** `admin@gghs123`
- ⚠️ Change password immediately after first login (Admin → Settings)

---

## 📊 How to Upload Results (Excel)

1. Login → Click **Results** in sidebar
2. Click **Download Template (.xlsx)** to get the pre-formatted file
3. Fill in student data — each row = one student

### Excel Column Reference

| Column | Description |
|--------|-------------|
| `RollNo` | Student roll number |
| `SRN` | Student Registration Number |
| `Name` | Full student name |
| `FatherName` | Father's full name |
| `MotherName` | Mother's full name |
| `DOB` | Date of birth (DD/MM/YYYY) |
| `Class` | 6 / 7 / 8 / 9 / 10 |
| `Section` | A / B (optional) |
| `Year` | Exam year e.g. 2024 |
| `English_Max` | Max marks in English |
| `English_Obt` | Marks obtained in English |
| `Hindi_Max` | Max marks in Hindi |
| `Hindi_Obt` | Marks obtained in Hindi |
| `Maths_Max` / `Maths_Obt` | Mathematics |
| `Science_Max` / `Science_Obt` | Science |
| `Social_Max` / `Social_Obt` | Social Studies |
| `Sanskrit_Max` / `Sanskrit_Obt` | Sanskrit |
| `Drawing_Max` / `Drawing_Obt` | Drawing / Art |
| `Position` | Class rank (optional) |
| `Remarks` | Teacher's remark (optional) |

> **Tip:** Add any extra subject with `SubjectName_Max` and `SubjectName_Obt`

4. Upload the filled Excel file using the drag-and-drop zone
5. Check the preview, then click **Save to Database**

---

## 🖨️ How Students Download Result (A4)

1. Open `results.html`
2. Enter Roll Number or SRN
3. Click **Search Result**
4. The result card appears on screen
5. Click **🖨️ Print / Save PDF (A4)**
6. In the print dialog: Select "Save as PDF" and choose A4 size

---

## 👩‍🏫 How to Add/Edit Teachers

1. Login → Click **Teachers** in sidebar
2. Fill the form (name, designation, subjects, qualification, etc.)
3. Optionally upload a photo
4. Click **Save Profile**
5. Use **Edit** or **Delete** buttons in the list below

---

## 📸 How to Post Activities/Notices

1. Login → Click **Activities** in sidebar
2. Fill title, category, date and description
3. Optionally upload a photo
4. Click **Post Activity**
5. It appears on the Activities page, home page, and news ticker

---

## 💾 Data Storage

All data is stored in browser **localStorage**:
- ✅ No server or internet required
- ✅ Persists between browser sessions on the same device
- ⚠️ Clearing browser data will erase all school data
- ⚠️ Data is device-specific

**Backup:** Admin → Settings → Export Backup (JSON)
**Restore:** Admin → Settings → Import Backup (JSON)

---

## 🎨 Design Details

- **Colors:** Deep Teal (#0d4f5c) + Royal Gold (#c8960c)
- **Fonts:** Playfair Display (headings) + Poppins (body)
- **Responsive:** Mobile, tablet, and desktop
- **Print:** A4 optimized result card

---

## 📱 Mobile Features

- Hamburger navigation menu
- Touch-friendly buttons
- Responsive grid layouts
- Swipe-friendly activity cards

---

*© 2024 Govt. Girls High School Kagdana, Tehsil Nathusari Chopta, Sirsa, Haryana – 125110*
*Email: gghs4700kagdana@gmail.com*
