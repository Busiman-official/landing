import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { setupByKey, type Setup } from "./_data";
import s from "./compare.module.css";

export function setupMetadata(setup: Setup) {
  return pageMetadata({ title: setup.title, description: setup.description, path: ROUTES[setup.key] });
}

export function CompareShell({ setup }: { setup: Setup }) {
  const path = ROUTES[setup.key];
  const next = setupByKey(setup.next.key);
  return (
    <>
      <Crumbs
        trail={[
          { name: "Compare", path: ROUTES.CompareHub },
          { name: setup.chip, path },
        ]}
      />
      <JsonLd data={webPageLd({ type: "WebPage", name: setup.title, description: setup.description, path })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className={`${s.herocard} wrap`}>
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Compare your setup</span>
            <h1 className="d1" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>{setup.title}</h1>
            <p className="lead">{setup.lead}</p>
            <p className={s.note}>We compare setups, not brands. Everything about Busiman here is a feature on our product pages, and the last column of the table is a question for you to ask about your own tool.</p>
          </div>
          <Photo src={setup.photo.src} alt={setup.photo.alt} height={360} style={{ borderColor: "var(--navy)" }} priority />
        </div>
      </div>

      <div style={{ paddingBottom: 80 }}>
        <div className={`${s.vs} wrap`}>
          <div className={s.side}>
            <span className="eyebrow">Today</span>
            <h2 className="d3">{setup.today.name}</h2>
            <p style={{ color: "var(--muted)" }}>{setup.today.line}</p>
            <ul>{setup.today.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <div className={s.mid} aria-hidden="true">or</div>
          <div className={`${s.side} ${s.us}`}>
            <span className="eyebrow lt">With Busiman</span>
            <h2 className="d3" style={{ color: "#fff" }}>{setup.busiman.name}</h2>
            <p>{setup.busiman.line}</p>
            <ul>{setup.busiman.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
            <span className="eyebrow lt">Job by job</span>
            <h2 className="d2">What changes on the shop floor</h2>
          </div>
          <ul className={s.cards}>
            {setup.rows.map(([job, ours, ask]) => (
              <li key={job} className={s.rowcard}>
                <b>{job}</b>
                <span className="rc-us">{ours}</span>
                <span className="rc-ask">Ask your tool: {ask}</span>
              </li>
            ))}
          </ul>
          <div className={`${s.tabwrap} scrollx`}>
            <table className={`${s.tblx} tbl`} style={{ minWidth: 760 }}>
              <thead>
                <tr>
                  <th scope="col">{setup.askHeads[0]}</th>
                  <th scope="col">{setup.askHeads[1]}</th>
                  <th scope="col">{setup.askHeads[2]}</th>
                </tr>
              </thead>
              <tbody>
                {setup.rows.map(([job, ours, ask]) => (
                  <tr key={job}>
                    <th scope="row" className={s.rowh}>{job}</th>
                    <td className={s.us}>{ours}</td>
                    <td className={s.ask}>{ask}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="card" style={{ border: "2px solid var(--ink)" }}>
            <span className="eyebrow">Stay as you are if</span>
            <h3>Your current setup is enough when</h3>
            <ul>{setup.enough.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
          <div className="card dark">
            <span className="eyebrow lt">Choose Busiman if</span>
            <ul>{setup.choose.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Questions</span>
            <h2 className="d2">Straight answers.</h2>
            <Link className={s.also} href={ROUTES[next.key]} style={{ marginTop: 12 }}>
              <b>{setup.next.label}</b>
              <span>{next.chip}: see how Busiman fits.</span>
            </Link>
          </div>
          <Faq items={setup.faq} />
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="d2">Try it on one real week.</h2>
            <p className="lead">Free to start. Bring your bills and your team, and judge it yourself.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("Contact")}>Talk to us</Link>
            </div>
          </div>
          <Photo src="/img/team-india.jpg" alt="A team of colleagues talking together in an office" height={260} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>
    </>
  );
}
