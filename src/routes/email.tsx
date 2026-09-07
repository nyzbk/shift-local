import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";
import { emailFaq } from "@/content/faq";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({
    meta: [
      { title: "Email a JPG if they must see it — AVIF often stays a download — Shift" },
      {
        name: "description",
        content:
          "Many mail clients will not paint AVIF in the thread. Gmail’s 25 MB cap is on the message. Shift writes the file in this tab. It does not send mail.",
      },
    ],
  }),
});

function EmailPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Email"
          title="A picture in the thread is not the same object as an AVIF attachment."
          lead="If they must see it without downloading, send JPG. Shift does not send the message."
        />
        <p>
          Bind’s mail page is about PDF versus a ZIP of pages. This page is about codec inside a mailbox.
          Official Gmail help (6584): if attachments total more than 25 MB, Gmail takes the files out and puts
          a Drive link in. That is a mail cap, not a Shift quota. Shift never talks to Drive.
        </p>
        <h2>Which object the recipient can actually see</h2>
        <p>
          <strong>They need to see the picture in the thread.</strong> Convert to JPG. Most clients paint JPEG
          inline. WebP preview is patchy. AVIF preview is rarer. A clerk who “did not get the photo” often got
          an AVIF they did not download.
        </p>
        <p>
          <strong>They asked for a small WebP for a website.</strong> Attach the WebP as a file and say so in
          the body. Do not expect Outlook 2016 to draw it.
        </p>
        <p>
          MIME/base64 makes a binary larger in the message than it looks on disk. A 20 MB ZIP of AVIF stills
          can already fail the cap. Split. Cap max width before convert.
        </p>
        <h2>What Shift does</h2>
        <p>
          It writes a blob in this tab. You save it. You attach it in Mail, Gmail, Outlook, Fastmail. Close the
          tab before save and the blob is gone. The <Link to="/">converter</Link> is the product. Mail is yours.
          iPhone Share into Mail still starts from a Files object — <Link to="/iphone">iPhone</Link>.
        </p>
        <h2>The ceiling</h2>
        <p>
          Shift will not raise Gmail’s 25 MB. Shift will not make Outlook render AVIF. Work servers often cap
          at 10 MB and bounce. Believe the bounce. Two mails beat one Drive surprise when policy forbids Drive.
        </p>
        <h2>Steps</h2>
        <ol>
          <li>Decide visible-in-thread (JPG) vs file-for-a-site (WebP). AVIF only if they named AVIF.</li>
          <li>Convert. Open the output on this device before compose.</li>
          <li>Look at file size. Near 20 MB+ — split or shrink max width.</li>
          <li>Attach from Files/Downloads, not Recents.</li>
          <li>WhatsApp is a different pipe — <Link to="/whatsapp">WhatsApp</Link>.</li>
        </ol>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Drive link appeared — Gmail 25 MB. Not Shift.</li>
          <li>Clerk sees a paperclip, no picture — they got AVIF/WebP. Send JPG.</li>
          <li>Outlook blocked the file — their policy, not a Shift header.</li>
        </ul>
        <h2>Work mailbox versus Gmail</h2>
        <p>
          Many work servers cap attachments at 10 MB and silently drop the rest. 25 MB is Gmail’s published
          number, not a universal law. If the clerk is on a government host, believe their bounce. Cap max
          width. Split the ZIP.
        </p>
        <h2>Do not CC a ZIP of identity scans as AVIF</h2>
        <p>
          Shift is local so a scan need not hit a conversion farm. Email is not local. If the document is
          identity-sensitive, ask whether the clerk has a portal. Do not send identity scans to
          ultaultimatum@gmail.com — Contact already says that.
        </p>
        <h2>Inline versus attachment</h2>
        <p>
          Dragging a file into Gmail compose may inline it as a preview. That preview path prefers JPEG.
          Attaching as a file keeps the name. Say “WebP attached, open on desktop” in the body. Shift does
          not write that sentence.
        </p>
        <h2>Second attachment: the photo plus the form</h2>
        <p>
          Two small JPG beat one mixed ZIP near the cap. Names survive. A ZIP of forty AVIF stills is how
          names and previews both die.
        </p>
        <h2>Reply-all with the same 18 MB ZIP</h2>
        <p>
          Each hop copies the attachment. Re-attach only when a new person is missing the file. Shift cannot
          see the thread.
        </p>
        <h2>Honesty limits</h2>
        <p>
          Shift does not BCC, does not virus-scan, does not talk to Drive. Success is: the object they can
          open, under the mail cap, attached from the folder you saved. Chat pipe:{" "}
          <Link to="/whatsapp">WhatsApp</Link>. Android WebView: <Link to="/android">Android</Link>.
        </p>
        <h2>Why AVIF disappears in a mailbox</h2>
        <p>
          A mail client draws an inline picture only when it knows the type and has a decoder. JPEG has been
          that type for decades. WebP is inconsistent: some webmail paints it, some desktop clients show a
          paperclip. AVIF is rarer still. The file arrived. The thread did not paint it. That is not a lost
          attachment. That is a missing preview. Convert to JPG when the job is “they must see it in the
          reply pane without downloading.”
        </p>
        <p>
          Corporate filters add a second ceiling. Unusual MIME types get stripped, quarantined, or renamed
          to <code>.dat</code>. AVIF and even WebP trip those filters more often than JPEG. If a clerk
          writes “empty attachment,” ask what their client shows as the type. Then send JPG.
        </p>
        <h2>Gmail 25 MB is a message cap</h2>
        <p>
          Help article 6584 is about the whole message: body plus every attachment. MIME/base64 grows a
          binary by about a third. A 19 MB ZIP on disk can already fail the cap once it is encoded for
          SMTP. When Gmail crosses the line it removes the files and leaves a Drive link. Shift did not
          create that link. Shift cannot delete it. Split the batch or shrink max width before convert.
        </p>
        <p>
          A Drive link is also a policy problem. Some offices block Drive for people outside the domain.
          Two mails with four JPG each beat one 24 MB ZIP that becomes a link nobody can open.
        </p>
        <h2>Apple Mail, Outlook, Fastmail — same decision, different paint</h2>
        <p>
          Apple Mail on a recent Mac may preview WebP and still skip AVIF. Outlook for Windows is older in
          this department. Fastmail in a browser follows the browser. None of those clients are Shift. Pick
          the output for the oldest inbox in the To: field, not for yours. If one person is on a locked
          work laptop, that person wins: send JPG.
        </p>
        <p>
          Signature images are not this job. A 40 KB JPEG in a signature is already a JPEG. Do not replace
          it with AVIF “for size.” The client will fail the preview and the signature looks broken.
        </p>
        <h2>Name the file and name the codec in the body</h2>
        <p>
          Shift names downloads with a <code>-shift</code> suffix and the real extension. Keep that name
          when you attach. A file called <code>scan.avif</code> that is actually a JPEG confuses everyone.
          Shift’s badge exists so you do not ship that lie. Open the output on this device before compose.
          If this device cannot draw it, theirs will not either.
        </p>
        <p>
          Write one sentence in the body: “JPG attached so it previews” or “WebP attached for the site,
          open on desktop.” Shift does not compose mail and does not keep a sent folder.
        </p>
        <h2>ZIP is an archive, not a preview</h2>
        <p>
          A ZIP of WebP or AVIF is a package of files the clerk must unpack. Phone mail apps often refuse
          to unpack. Desktop Outlook may pass the ZIP to the system and stop. If they needed to see six
          stills in the thread, send six JPG, or send two mails. The ZIP path on Shift is for your own
          archive after convert — Download ZIP on the{" "}
          <Link to="/">homepage</Link> — not for the first contact with a stranger’s inbox.
        </p>
        <h2>What this page is not</h2>
        <p>
          This is not Crush’s JPEG slider as the product. This is not Bind’s “pages versus a ZIP of
          pages.” Shift changes codec in this tab. Mail decides what it will paint and what it will
          bounce. Encode walkthrough: <Link to="/guide">guide</Link>. Compare the two modern still
          codecs: <Link to="/webp-vs-avif">WebP vs AVIF</Link>.
        </p>
      </Prose>
      <FaqSection heading="Email questions" items={emailFaq} />
      <Prose>
        <ConvertCta label="Open the converter" />
      </Prose>
    </AppShell>
  );
}
