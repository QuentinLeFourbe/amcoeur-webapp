# @amcoeur/email-builder

A shared, universal React-based library for building and rendering consistent, brand-aligned emails for the Amcoeur association.

## 🚀 The Philosophy: "Email-as-Data"

This library solves a common problem in software engineering: **Visual Drift**. Traditional email systems often have separate logic for the frontend preview and the backend rendering.

`@amcoeur/email-builder` uses an **AST (Abstract Syntax Tree)** approach:
1. The **Backoffice** generates a structured **JSON** object.
2. The **Library** translates this JSON into a React tree.
3. The **Backoffice** renders this tree for real-time preview.
4. The **Server** renders this same tree into a static, inlined HTML string.

This guarantees that **what you see in the editor is exactly what the user receives in their inbox.**

---

## 🏗️ Architecture

The library is built on top of [React Email](https://react.email/), ensuring high compatibility with modern and legacy email clients (including Outlook, Gmail, and Apple Mail).

It is designed to be **Universal**:
- **Browser-Safe**: It avoids Node.js dependencies (like `fs` or `juice`) when imported in a browser environment.
- **Server-Ready**: It uses `@react-email/render` only when running in Node.js to provide CSS inlining and static markup generation.

---

## 📦 Installation

```bash
pnpm add @amcoeur/email-builder
```

---

## 🛠️ Usage

### 1. Define your Email Payload

The `EmailPayload` is the source of truth. It defines the structure of your email.

```typescript
import { EmailPayload } from '@amcoeur/email-builder';

const campaign: EmailPayload = {
  subject: "News from the shelter!",
  blocks: [
    { 
      type: 'title', 
      content: 'New Adoptions this Week' 
    },
    { 
      type: 'text', 
      markdown: 'We are **so happy** to announce that 3 cats found a home!' 
    },
    { 
      type: 'image', 
      layout: 'duo', 
      images: [
        { url: 'https://...', caption: 'Milo' },
        { url: 'https://...', maxHeight: 200 }
      ] 
    }
  ]
};
```

### 2. Live Preview (Backoffice / React)

Because an email is a complete HTML document (`<html>`, `<body>`, etc.), you cannot render it directly in a standard `<div>`. Use a **React Portal** or an **Iframe**.

```tsx
import { EmailRenderer } from '@amcoeur/email-builder';

const MyEditorPreview = ({ data }) => {
  return (
    <div className="preview-container">
      {/* Recommended: Render inside an iframe using a Portal */}
      <EmailRenderer payload={data} baseUrl="http://localhost:3000" />
    </div>
  );
};
```

### 3. Static Rendering (Server / Node.js)

The server uses the async `renderEmailHtml` function to generate the final string for your mailer (e.g., Nodemailer).

```typescript
import { renderEmailHtml, renderEmailText } from '@amcoeur/email-builder';

// Generate HTML with inlined CSS
const html = await renderEmailHtml(payload, "https://api.amcoeur.org");

// Generate Plain Text fallback
const text = await renderEmailText(payload, "https://api.amcoeur.org");
```

---

## 🎨 Available Blocks & Styling

### Title Block (`title`)
- **Font**: Playfair Display (Serif)
- **Color**: Matte Amcoeur Pink (`#E11D48`)
- **Alignment**: Centered

### Text Block (`text`)
- **Format**: Markdown supported
- **Font**: Roboto (Sans-serif)
- **Alignment**: Left-aligned within the central container

### Image Block (`image`)
- **Layouts**: `single`, `duo`, or `trio`
- **Features**: 
  - `maxHeight`: Optional height limit in pixels.
  - `caption`: Optional italicized label under each image.

---

## 🌍 The `baseUrl` parameter

All images and links in an email **must use absolute URLs**. 

The `baseUrl` is used to:
1. Resolve the association's **Logo** (`/assets/amcoeur_logo.jpg`).
2. Resolve user-uploaded images if they use relative paths.

| Env | `baseUrl` value |
| :--- | :--- |
| **Local Dev** | `http://localhost:3000` |
| **Production** | `https://api.amcoeur.org` |

---

## 🛠️ Customization for External Devs

If you wish to reuse this library for another project:
1. **Colors**: Search for `#E11D48` in `EmailLayout.tsx` and `BlockTitle.tsx`.
2. **Fonts**: Update the Google Font URLs and names in `EmailLayout.tsx`.
3. **Logo**: Update the `Img` tag in the `header` section of `EmailLayout.tsx`.

---

## 🔧 Development

Managed by Nx:
- **Build**: `nx build email-builder`
- **Test**: `nx test email-builder`
- **Lint**: `nx lint email-builder`
