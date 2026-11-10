import { CompareShell, setupMetadata } from "../CompareShell";
import { setupByKey } from "../_data";

const setup = setupByKey("CmpBilling");

export const metadata = setupMetadata(setup);

export default function Page() {
  return <CompareShell setup={setup} />;
}
