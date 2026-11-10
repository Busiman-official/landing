import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { StoreSteps, type StoreStep } from "./StoreSteps";
import s from "./page.module.css";

const PATH = "/features/online-store";
const DESCRIPTION =
  "Every company gets a public online store at its own busiman.org address. Products, stock and orders come from the app you already use at the counter.";

export const metadata = pageMetadata({
  title: "Online store for your shop at yourshop.busiman.org",
  description: DESCRIPTION,
  path: PATH,
});

const TABS: StoreStep[] = [
  { name: "Details", title: "Tell customers who you are", body: "Start with your store details, so the page carries your shop name and contact.", points: ["Guided, one step at a time", "Public at your company code address", "Edit later from the app"], slipTitle: "Store details", rows: [{ l: "Store name", v: "Your shop" }, { l: "Address", v: "yourshop.busiman.org" }, { l: "Status", v: "Draft" }] },
  { name: "Policies", title: "Write your own policies", body: "Add the policies customers see on your store, in your own words.", points: ["Shown on the public store", "Edited in the app", "Yours to write and update"], slipTitle: "Policies", rows: [{ l: "Policy 1", v: "Added" }, { l: "Policy 2", v: "Added" }, { l: "Policy 3", v: "To do" }] },
  { name: "Products", title: "One catalogue for counter and web", body: "Products are managed in the same app that bills your counter.", points: ["No retyping between systems", "Same items online and at the till", "Managed from the phone or desktop"], slipTitle: "Products", rows: [{ l: "Item A", v: "Listed" }, { l: "Item B", v: "Listed" }, { l: "Item C", v: "Draft" }] },
  { name: "Delivery", title: "Ship with Shiprocket", body: "Set how far you deliver by pincode and send parcels through Shiprocket.", points: ["Delivery distance by pincode", "Shiprocket shipping", "Parcels leave from your shop"], slipTitle: "Delivery", rows: [{ l: "Carrier", v: "Shiprocket" }, { l: "Pincode", v: "Sample pincode" }, { l: "Status", v: "In range" }] },
  { name: "Orders", title: "Orders reach you at once", body: "Customers check out on the store and the owner gets a notification.", points: ["Checkout on the public store", "Notification to the owner", "Orders sit beside counter sales"], slipTitle: "New order", rows: [{ l: "Order", v: "Sample order" }, { l: "Items", v: "2" }, { l: "Owner alert", v: "Sent" }] },
];

const STEPS = [
  ["Run the wizard", "A guided setup asks for your store details and policies."],
  ["Add products", "List products in the app. The same items serve the counter and the store."],
  ["Set delivery", "Connect Shiprocket shipping and set delivery distance by pincode."],
  ["Take orders", "Customers check out on your store and you are notified of each order."],
];

const GET = [
  ["Setup wizard", "A guided flow takes you through the store step by step."],
  ["Store details and policies", "Add your shop details and your own policies so customers know your terms."],
  ["Products", "Manage the catalogue in the app that also runs your counter sales."],
  ["Delivery and Shiprocket", "Ship with Shiprocket, and set how far you deliver using pincodes."],
  ["Checkout and orders", "Customers check out online, and the owner gets a notification for each order."],
  ["Store credit and admin PIN", "Give customers store credit, and protect admin actions with a PIN."],
];

const FAQ = [
  { q: "Where will my store live?", a: "Each company gets a public store at its company code on busiman.org, for example yourshop.busiman.org." },
  { q: "Do I need a separate system for the store?", a: "No. The store uses the same app and products as your counter sales." },
  { q: "How do I ship orders?", a: "Delivery works with Shiprocket, and you can set delivery distance by pincode." },
  { q: "How will I know about a new order?", a: "The owner is notified of each order placed at checkout." },
  { q: "Can I protect store settings?", a: "Yes. An admin PIN guards admin actions, and you write your own store policies." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman online store", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "Online store", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Online store · delivery · orders</span>
            <h1 className="d1">
              Your shop, <span className={`hl ${s.hl}`}>online,</span> from the same app.
            </h1>
            <p className="lead">
              Every company gets a public store at its own address. Products, stock and orders come from the app you
              already use at the counter.
            </p>
            <span className={s.url}>yourshop.busiman.org</span>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#steps">See the setup steps</a>
            </div>
          </div>
          <Photo src="/img/packing-parcels.jpg" alt="Online orders being packed at a table" height={440} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">The problem</span>
            <h2 className="d2">A second system for the website means double work.</h2>
            <p className="lead">
              When the online catalogue lives apart from the counter, someone retypes products and reconciles orders.
              Here the store and the shop are one app, so there is one place to keep products and see orders.
            </p>
          </div>
          <Photo
            src="/img/phone-billing.jpg"
            alt="A shopkeeper using a smartphone among shoe boxes"
            height={340}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>

      <div id="steps" className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Inside the store setup</span>
            <h2 className="d2">Step through what the wizard covers.</h2>
          </div>
          <StoreSteps tabs={TABS} demoClass={s.demo} noteClass={s.note} />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">How it works</span>
            <h2 className="d2">From the counter to a public store.</h2>
          </div>
          <div className={s.setup}>
            {STEPS.map(([h, p]) => (
              <div className={s.st} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What you get</span>
            <h2 className="d2">A store with the basics done.</h2>
          </div>
          <div className="g3">
            {GET.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Found online</span>
            <h2 className="d2">Search basics are built in.</h2>
            <p className="lead">
              Your public store comes with a sitemap and SEO basics, at an address made from your company code on
              busiman.org.
            </p>
            <Photo
              src="/img/boutique-owner.jpg"
              alt="A shop owner standing inside his clothes store"
              height={220}
              style={{ borderColor: "var(--amber)" }}
            />
          </div>
          <Photo
            src="/img/laptop-dashboard.jpg"
            alt="A laptop showing a dashboard on a desk"
            height={460}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>

      <div className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Keep exploring</span>
            <h2 className="d3">One app, counter and web.</h2>
          </div>
          <div className={s.links}>
            <Link href={r("Retail")}>Retail and counter sales<small>The same app that takes orders online</small></Link>
            <Link href={r("Inventory")}>Inventory<small>Keep the catalogue in one place</small></Link>
            <Link href={r("FeatureGST")}>GST billing<small>Invoices by state</small></Link>
            <Link href={r("Features")}>All features<small>Everything in Busiman</small></Link>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Store questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Open your online store from the app you already use.</h2>
          <p className="lead">Start free and follow the setup wizard.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Talk to us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
