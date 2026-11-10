import { Photo } from "@/components/kit/Photo";
import { pageMetadata } from "@/lib/seo";
import { SignupForm } from "./SignupForm";
import s from "./page.module.css";

export const metadata = pageMetadata({
  title: "Create your company account",
  description:
    "Start with your company and add the rest as you go: set up your company, add products, add staff and make your first bill.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <div className="sec" style={{ paddingTop: 56 }}>
      <div className={`wrap ${s.su}`}>
        <div className="stack" style={{ gap: 24 }}>
          <span className="eyebrow">Create your account</span>
          <h1 className="d2">Start with your company. Add the rest as you go.</h1>
          <p className="lead">Here is what you can do first, in the order most owners do it.</p>
          <ol className={s.first}>
            <li>Set up your company</li>
            <li>Add products</li>
            <li>Add staff</li>
            <li>Make your first bill</li>
          </ol>
          <Photo src="/img/kirana-store-interior.jpg" alt="Inside a busy Indian grocery store" height={240} />
        </div>
        <div className={s.formc}>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
