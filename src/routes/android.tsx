import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";
import { androidFaq } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/android")({
  component: AndroidPage,
  head: () =>
    articleHead({
      title: "Android Chrome is not the shop WebView — Shift",
      description:
        "Native AVIF encode on Android often lies. Shift probes magic bytes. Use WebP when the other device is a WebView or an unknown phone.",
      path: "/android",
      appName: "Android AVIF probe",
      faqs: androidFaq,
    }),
});

function AndroidPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Android"
          title="The Chrome that encoded your AVIF is not the app that must open it."
          lead="WebViews lag. Samsung Internet lies. Shift’s badge is the honest signal on this device."
        />
        <p>
          The iPhone page is Safari and Files. This page is the other pocket: Chrome, WebView, Samsung
          Internet, cheap Androids with 3 GB of RAM. Shift already probes AVIF twice — native 1×1 checked
          with <code>ftyp/avif</code>, then WASM. If both fail, the button dies and WebP still works. That
          sentence is the product. Buttons: <Link to="/guide">guide</Link>.
        </p>
        <h2>Three runtimes people mix up</h2>
        <p>
          <strong>Chrome stable.</strong> Decode of AVIF is usually fine. Encode via{" "}
          <code>canvas.toBlob('image/avif')</code> is the liar: some builds return a JPEG with an AVIF name.
          Shift rejects that blob when magic bytes are wrong.
        </p>
        <p>
          <strong>In-app WebView.</strong> Instagram, a marketplace, a bank. They ship an old Chromium. They
          accept JPG. They may accept WebP. They often do not accept AVIF upload. Do not debug Shift against
          a store WebView.
        </p>
        <p>
          <strong>Samsung Internet and forks.</strong> Same lie, different UA. Trust the badge, not the file
          extension you typed.
        </p>
        <h2>What Shift does on this origin</h2>
        <p>
          Drop JPG/PNG/WebP/AVIF, pick output, quality, optional max width, convert, download or ZIP. Nothing
          is posted. Airplane mode works after WASM has loaded. AVIF off is not a paywall. Long compare:{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link>. Back to a boring file:{" "}
          <Link to="/avif-to-jpg">AVIF to JPG</Link>.
        </p>
        <h2>The ceiling</h2>
        <p>
          Shift cannot update the WebView inside a shop app. It cannot make a 2019 phone encode AVIF in time
          before the tab dies. 48 MP JPEGs on 3 GB RAM: cap width to 1280 or 1920. Sequential encode exists
          because parallel decode kills the tab. That is heap, not quota.
        </p>
        <h2>Steps</h2>
        <ol>
          <li>Open Shift in Chrome, not inside the messenger WebView.</li>
          <li>Read the AVIF badge. If it says no, pick WebP.</li>
          <li>Cap max width if the source is a 48 MP camera JPEG.</li>
          <li>Convert. Open the output in Files or Downloads on this phone before you upload elsewhere.</li>
          <li>
            If the destination is a form inside another app, prefer JPG. Chat pipe:{" "}
            <Link to="/whatsapp">WhatsApp</Link>. Mail: <Link to="/email">email</Link>.
          </li>
        </ol>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>AVIF button off — probe failed. Use WebP.</li>
          <li>.avif that opens as JPEG — native encode lied. Badge should have said no.</li>
          <li>Tab died on four 48 MP photos — heap. Fewer files, smaller width.</li>
          <li>Home Screen icon still a website — no extra codec.</li>
        </ul>
        <h2>Add to Home Screen is still Chrome’s engine</h2>
        <p>
          The icon looks like an app. It does not gain a new AVIF encoder. The probe is the same. Treat it
          as a bookmark.
        </p>
        <h2>Files app versus Downloads versus the camera roll</h2>
        <p>
          Shift writes into Downloads through the browser. The camera roll still holds the JPEG you started
          with. A gallery app that “does not show WebP” is a gallery limit, not a failed convert. Open the
          file from Downloads.
        </p>
        <h2>Play Store WebView forms</h2>
        <p>
          Marketplace and bank apps embed a WebView. Upload JPG there. Fighting AVIF inside that form wastes
          a retry. Convert here in Chrome, save, then pick the JPG in their picker.
        </p>
        <h2>Low-RAM phones</h2>
        <p>
          3 GB devices die on four 48 MP stills. Sequential encode is already the law in ConverterApp. Cap
          width. Close other tabs. There is no cloud queue when the tab vanishes.
        </p>
        <h2>Sharing to another Android</h2>
        <p>
          Nearby Share / Bluetooth sends the file you point at. If you point at Recents, you send JPEG. Point
          at the Shift download. Their gallery may still refuse AVIF preview — they can still keep the file.
        </p>
        <h2>Honesty limits</h2>
        <p>
          Shift does not update WebView, does not patch Samsung Internet, does not decode HEIC. Success is:
          a badge you believed, a file you opened on this phone, then a destination that matches that codec.
          iPhone path: <Link to="/iphone">iPhone</Link>. Chat: <Link to="/whatsapp">WhatsApp</Link>. Mail:{" "}
          <Link to="/email">email</Link>.
        </p>
        <h2>Why native toBlob lies on Android</h2>
        <p>
          Feature detect is not enough. A browser can claim <code>image/avif</code> and still hand you a
          JPEG, an empty blob, or a WebP with the wrong type. Shift encodes a 1×1, then reads magic bytes
          for an ISO-BMFF <code>ftyp</code> with an <code>avif</code> brand. No brand, no badge. The WASM
          encoder is the second chance. If WASM is blocked or times out, AVIF stays off. That is honest.
          Shipping a file named <code>.avif</code> that starts with JPEG SOI is how other tools burn a
          morning.
        </p>
        <p>
          Firefox on Android and Chrome on Android are not the same probe. Run the badge on the browser you
          will convert in. Do not convert in Chrome and assume Samsung Internet will write the same bytes.
        </p>
        <h2>Intents, pickers, and scoped storage</h2>
        <p>
          Android pickers talk in intents. A shop app’s “upload photo” intent often filters to JPEG and
          PNG. Your WebP sits in Downloads and never appears in that grid. That is the filter, not a
          missing file. Open the system Files app, browse Downloads, pick the <code>-shift</code> name.
          If the form still rejects the type, convert to JPG here and pick that.
        </p>
        <p>
          Scoped storage means one app cannot see another app’s private folder. Shift’s download is the
          browser’s download. WhatsApp’s recode lives in WhatsApp. The camera roll is the camera. Point
          at the folder you saved.
        </p>
        <h2>Gallery apps that hide WebP</h2>
        <p>
          Some OEM galleries index JPEG and PNG and skip WebP. The file is on disk. The album is a view.
          Open Downloads or a file manager. If you needed them to <em>see</em> a picture in a gallery,
          send JPG. If you needed them to keep a modern still for a website, send WebP as a file and say
          so.
        </p>
        <h2>Unknown destination, default WebP</h2>
        <p>
          You encoded AVIF in Chrome. Their phone is a three-year-old store WebView. They see a blank.
          Default output on Shift is WebP for this reason. Use AVIF when the other side named AVIF and
          you watched the badge stay yes. Unknown phone, unknown form, unknown mail client: WebP or JPG.
        </p>
        <p>
          Reverse path if someone sent you an AVIF this phone will not draw:{" "}
          <Link to="/avif-to-jpg">AVIF to JPG</Link>. Compare the two codecs without the delivery story:{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link>.
        </p>
        <h2>What this page is not</h2>
        <p>
          This is not a second iPhone chapter. Share sheet and HEIC live on{" "}
          <Link to="/iphone">iPhone</Link>. This is not GPS wipe. This is not a PDF binder. Shift
          changes codec in this tab. Android decides which runtime opens the next form. Convert stays
          on the <Link to="/">homepage</Link>.
        </p>
        <p>
          If a form inside another app rejects WebP, do not reopen Shift inside that WebView and try
          AVIF. Leave the shop app. Convert to JPG in Chrome. Save. Come back to their picker. The
          badge you trusted in Chrome does not travel into their embedded Chromium.
        </p>
      </Prose>
      <FaqSection heading="Android questions" items={androidFaq} />
      <Prose>
        <ConvertCta label="Open the converter" />
      </Prose>
    </AppShell>
  );
}
