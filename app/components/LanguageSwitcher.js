"use client";
import Image from "next/image";
import { useTranslation } from "../TranslationProvider";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation();

  return (
    <>
      {language === "en" ? (
        <span
          className="lang-switcher-wrapper-span"
          onClick={() => changeLanguage("ro")}
          style={{ fontWeight: language === "ro" ? "bold" : "normal" }}
        >
          <Image width={32} height={32} src="/ro.png" alt="Română" />
        </span>
      ) : (
        <span
          className="lang-switcher-wrapper-span"
          onClick={() => changeLanguage("en")}
          style={{
            fontWeight: language === "en" ? "bold" : "normal",
            marginRight: "10px",
          }}
        >
          <Image width={32} height={32} src="/en.png" alt="English" />
        </span>
      )}
    </>
  );
}
