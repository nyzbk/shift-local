import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Shift — Ultimatum | WebP & AVIF converter" },
      {
        name: "description",
        content:
          "Email Ultimatum about Shift, the private WebP and AVIF converter. Do not send photos you do not want in a mailbox.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Contact"
          title="Talk to the people who run Shift"
          lead="There is no chatbot and no ticket queue. Email is the channel. The converter still does not need your address."
        />
        <h2>Email</h2>
        <p>
          <a href="mailto:ultaultimatum@gmail.com">ultaultimatum@gmail.com</a>
        </p>
        <p>
          Use this for product questions, privacy, terms, and AdSense or legal notices about{" "}
          <strong>shift-local.vercel.app</strong>. Shift is made by Ultimatum. We read mail; we do not run a 24/7 desk.
        </p>
        <h2>What to put in the message</h2>
        <p>
          Browser and OS (for example: Safari on iPhone 14, Chrome on Windows). Output codec you picked. The exact
          error sentence on the row, if there was one. Whether the AVIF badge said yes or no. Do not attach the photo
          unless we ask — the converter is built so we never need the pixels.
        </p>
        <h2>Do not email your photos</h2>
        <p>
          The whole point of Shift is that images stay in the tab. If you attach a camera roll to an email, that copy
          lives in a mailbox. Convert on the <Link to="/">home page</Link> instead. If a file fails, describe the
          browser, the output codec, and the error sentence — not the pixels.
        </p>
        <h2>This is not support for other Ultimatum sites</h2>
        <p>
          Crush, HEIC Local, Folio, Nota and Strip are separate properties. If the problem is a PDF merge, this inbox
          will bounce you to Folio. If the problem is GPS in a JPEG, that is Strip. Links are on{" "}
          <Link to="/about">About</Link>. This address is still the right legal contact for Shift.
        </p>
        <h2>Publisher</h2>
        <p>
          Ultimatum · Shift · <code>ca-pub-7636435144500691</code>
          <br />
          Site: <a href="https://shift-local.vercel.app/">https://shift-local.vercel.app/</a>
        </p>
      </Prose>
    </AppShell>
  );
}
