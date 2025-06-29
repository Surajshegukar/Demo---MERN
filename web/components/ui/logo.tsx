import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Cruip">
     <Image src="/images/logo.png" alt="Cruip Logo" width={125} height={125} />

    </Link>
  );
}
