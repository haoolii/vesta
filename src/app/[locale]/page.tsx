import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Home } from "./_component/home";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <Home />
    </div>
  );
}
