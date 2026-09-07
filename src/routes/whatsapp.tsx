import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";
import { whatsappFaq } from "@/content/faq";

export const Route = createFileRoute("/whatsapp")({
  component: WhatsAppPage,
  head: () => ({
    meta: [
      { title: "WhatsApp will recode your WebP — Shift" },
      {
        name: "description",
        content:
          "Photo send recodes frames. AVIF often dies in the chat pipe. Shift writes WebP or AVIF in this tab. Send as a document if the bytes must survive.",
      },
    ],
  }),
});

function WhatsAppPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="WhatsApp"
          title="A chat bubble is not the file Shift wrote."
          lead="Photo send recodes. Document send carries bytes. Those are not the same job."
        />
        <p>
          People convert a JPEG to WebP here, tap WhatsApp, and send it as a photo. The other person gets
          WhatsApp’s frame, often a JPEG, often softer, often without the name you saved. Bind’s cousin problem
          is pages; this page is only codec. The converter lives on the{" "}
          <Link to="/">homepage</Link>. Safari path: <Link to="/iphone">iPhone</Link>.
        </p>

        <h2>Photo send versus document send</h2>
        <p>
          <strong>Send as photo.</strong> WhatsApp recodes. WebP usually leaves as their JPEG. AVIF in the photo
          pipe is worse: refuse, flatten, or a grey tile. HD toggles change <em>their</em> recode. They do not
          preserve Shift’s encoder.
        </p>
        <p>
          <strong>Send as document.</strong> You attach bytes. If those bytes are the Shift download from Files
          or Downloads, the other person can keep a WebP. Their preview may still fail to paint AVIF. Document
          is a pipe, not a decoder you control.
        </p>
        <p>
          Status and View once are delivery modes. They do not keep a codec. Forwarding a bubble forwards the
          recode, not the Shift file.
        </p>

        <h2>What Shift does before you open WhatsApp</h2>
        <p>
          Default output is WebP because it opens in more places than AVIF. Quality slider is lossy. PNG out
          ignores the slider. If the other person must <em>see</em> a picture inside the thread, convert to JPG
          on purpose — that is the boring object chat clients already know. Codec choice long-form:{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link>.
        </p>
        <p>
          HEIC from Camera Roll is refused here. Convert that still first, then Shift. One sentence, not a
          chapter. iPhone buttons: <Link to="/iphone">iPhone</Link>.
        </p>

        <h2>The ceiling</h2>
        <p>
          Shift cannot patch WhatsApp. It cannot publish a fake “WhatsApp accepts AVIF” megabyte. A 40-megapixel
          WebP may still be heavy as a document. Cap max width to 1920 before convert if the chat is the
          destination. Desktop WhatsApp opens a disk dialog that defaults to Pictures — Pictures is JPEGs.
          Point it at Downloads.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>Convert in Safari or desktop Chromium. Prefer WebP unless they asked for AVIF by name.</li>
          <li>Save the file. On iPhone, Files, not Recents. Recents is the photo stack.</li>
          <li>WhatsApp → attach document → that file. Skip the photo grid.</li>
          <li>
            If they insist on photos, convert to JPG here first, then send as photo knowing it will recode
            again. Say so.
          </li>
          <li>If the document is huge, lower max width. Do not “compress inside WhatsApp” and hope the codec survives.</li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>They received a soft JPEG — photo send. Send the Shift file as document.</li>
          <li>AVIF preview blank in chat — their client. Send WebP or JPG.</li>
          <li>Desktop attached DCIM — wrong folder.</li>
          <li>View once expired — delivery mode, not Shift.</li>
        </ul>

        <h2>Forward from the thread is not forward from Files</h2>
        <p>
          A photo you already sent sits in the thread as WhatsApp’s recode. Forwarding that bubble forwards
          the recode. It does not resurrect the WebP Shift wrote. Attach the Files object again if the packet
          must stay a WebP. Starred messages are not a codec archive.
        </p>
        <h2>Group admin who wanted “one small file”</h2>
        <p>
          School parents dump a burst of 48 MP JPEGs into the group. Convert once, cap width, WebP as
          document, caption the pixel size. Everyone else can keep sending photos. Shift does not moderate
          the group and does not unzip their burst.
        </p>
        <h2>Do not screenshot a WebP preview into the chat</h2>
        <p>
          Preview → screenshot → send photo. You invented a new JPEG with a new crop and a new recode. Send
          the file, or convert to JPG here on purpose.
        </p>
        <h2>WhatsApp Web</h2>
        <p>
          Web attaches from the computer dialog. The dialog loves Pictures. Shift download is Downloads. If
          you converted on the phone and never copied the file, Web cannot attach a file that is only on the
          phone.
        </p>
        <h2>Stickers, status, view-once</h2>
        <p>
          None of those keep Shift’s encoder. A sticker is their format. Status expires. View-once is a
          delivery flag. Convert for a file you still hold in Files.
        </p>
        <h2>Honesty limits</h2>
        <p>
          Shift does not end-to-end encrypt the file for you and does not unsend a photo stack. Success is: a
          WebP or JPG you opened, attached as a document, from Files or Downloads. If you still dump Recents
          into the thread, you sent photos. Mail caps: <Link to="/email">email</Link>. Unknown Android:
          <Link to="/android">Android</Link>.
        </p>

        <h2>Why photo send cannot keep a WebP</h2>
        <p>
          Chat apps treat “photo” as a frame they own. They resize, they pick a JPEG quality, they write
          their own filename, they store a copy in Shared Media. That pipeline exists so a cheap phone can
          show a bubble without downloading an original. It is not a file-transfer protocol. Shift’s output
          is a file-transfer object. Mixing the two is how a clean WebP becomes a soft JPEG with a new hash.
        </p>
        <p>
          HD / “best quality” still runs their encoder. The toggle changes <em>how hard</em> they recode,
          not whether they recode. A 4K WebP sent as a photo is still their frame. The only path that
          carries Shift’s bytes is document attach from the folder you saved.
        </p>

        <h2>AVIF inside a chat bubble</h2>
        <p>
          AVIF as a photo is the worst of the three outputs for WhatsApp. Many clients refuse the type,
          flatten it to JPEG, or paint a grey tile. Document send can carry the bytes, but the other
          person’s preview still depends on their app. If they must open the picture inside the thread
          without tapping Download, convert to JPG here and send that as a photo on purpose. Do not
          promise them an AVIF bubble.
        </p>
        <p>
          If they asked for AVIF by name — a web team, a <code>picture</code> tag — send the Shift file
          as a document and write “AVIF attached, open on desktop” in the caption. Caption text does not
          preserve a codec. It only tells a human what to do with the file.
        </p>

        <h2>Communities, broadcasts, and catalogs</h2>
        <p>
          A Community announcement and a one-to-one chat use the same photo pipe. Catalog photos on
          WhatsApp Business are their recode for a shop grid. Shift does not publish to a catalog and
          does not keep a listing in sync. Convert here, save, then upload from Files if their desktop
          tool asks for a still. Prefer JPG for that form when the other side is unknown.
        </p>
        <p>
          Broadcast lists multiply the same recode. If twelve people needed the WebP, attach the
          document once in a group, or send the file twelve times as a document. Forwarding the first
          bubble twelve times forwards twelve JPEGs.
        </p>

        <h2>Shared Media is their copy</h2>
        <p>
          On the other phone, Shared Media / Gallery often shows WhatsApp’s stored frame, not your
          Downloads file. That is why they swear they “got a JPEG.” They did. Their gallery is not a
          witness for Shift. Ask them to open the document from the chat, not from the album WhatsApp
          built.
        </p>
        <p>
          On your own phone the same trap exists. After a photo send, Recents fills with their recode.
          The Shift download still sits in Files or Downloads with the <code>-shift.webp</code> name.
          Attach that object next time. Do not pick the Recents thumbnail that looks similar.
        </p>

        <h2>Desktop versus phone attach</h2>
        <p>
          WhatsApp Desktop and WhatsApp Web both open a disk dialog. Default folder is Pictures or
          DCIM. Those folders are camera JPEGs. Shift writes into the browser download directory.
          Change the dialog. If you converted on the phone and you are attaching on the computer, copy
          the file first. Cloud placeholders that have not finished downloading attach as empty stubs.
        </p>
        <p>
          Multi-select in the photo grid is still photo send. Multi-select in a file dialog can be
          document send. Look at the picker title. If it says Photos, you are in the recode pipe.
        </p>

        <h2>Size before the chat, not after</h2>
        <p>
          A 48-megapixel WebP is a bad chat document even when the codec is honest. Cap max width to
          1920 for a group, 1280 for a thumbnail someone will open on a bus. Quality 85% is enough.
          Do not convert at full resolution and then tap WhatsApp’s own compress. That second pass is
          their JPEG again.
        </p>
        <p>
          Batch ZIP is for your archive, not for the thread. Unzip, attach the one file they asked
          for. A ZIP inside a chat is a document they may not unpack on a phone.
        </p>

        <h2>What this page is not</h2>
        <p>
          This is not a GPS wipe. This is not “twelve bubbles become one PDF.” This is not a JPEG
          quality slider as the product. Shift changes codec in this tab. WhatsApp decides how a
          photo bubble is stored. Buttons for the convert itself stay on the{" "}
          <Link to="/">homepage</Link>. Click-by-click encode: <Link to="/guide">guide</Link>.
          Reverse path if they sent you an AVIF you cannot open:{" "}
          <Link to="/avif-to-jpg">AVIF to JPG</Link>.
        </p>
      </Prose>
      <FaqSection heading="WhatsApp questions" items={whatsappFaq} />
      <Prose>
        <ConvertCta label="Open the converter" />
      </Prose>
    </AppShell>
  );
}
