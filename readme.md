# North Star Bakery - Website Project

This is a multi-page web application for **North Star Bakery**, a neighborhood bakery focused on warm, handmade breads, pastries, and custom orders. The site is designed to introduce the bakery, showcase menu items, and allow customers to plan pre-orders easily.

---

## Project Structure

- **`index.html`** - Home page featuring a welcome audio clip, store overview, hours, and weekly specials.
- **`products.html`** - Product menu with bread and pastry items, featuring an interactive Pre-Order planner.
- **`about.html`** - Story of the bakery, sourcing philosophy, staff highlights, and a behind-the-scenes video.
- **`contact.html`** - Location information and an inquiry/pre-order form with JavaScript validation and auto-fill support.
- **`css/styles.css`** - External stylesheet providing responsive layout (Flexbox & Media Queries), typography, and client color palette.
- **`js/script.js`** - JavaScript file handling pre-order favorites, browser storage (`localStorage`), and custom form validation.
- **`pictures-and-videos/`** - Media folder containing storefront images, product photos, logo, audio, and video assets.

---

## Key Features & Interactivity

1. **Pre-Order Favorites Planner (`products.html`):**
   - Users can click **"+ Save to Order"** on any bread or pastry item.
   - The button dynamically toggles to **"Saved to Order"**, and a summary box at the top updates the saved item count and list in real time.
   - Includes a **"Clear All Items"** option to reset selections.

2. **Client-Side Data Persistence (`localStorage`):**
   - Saved pre-order selections persist in `localStorage` across browser refreshes and page navigation.
   - When opening `contact.html`, the saved items automatically pre-fill into the **Item Details & Quantities** text box.

3. **Custom Form Validation (`contact.html`):**
   - Validates that names are at least 2 characters long.
   - Verifies valid email address formatting using regular expressions.
   - Prevents invalid form submissions and displays clear red error messages directly under problematic fields.

---

## Future Enhancements

There is plenty of room for future updates to build on this site, such as:
- Adding a dynamic pickup date time-slot picker.
- Calculating live estimated totals for pre-orders based on item quantities.
- Integrating a backend service or API to process order submissions.