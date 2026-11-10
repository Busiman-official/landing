import { CompareShell, setupMetadata } from "../CompareShell";
import { setupByKey } from "../_data";

const setup = setupByKey("CmpHr");

export const metadata = setupMetadata(setup);

export default function Page() {
  return <CompareShell setup={setup} />;
}
