import { translateText } from "./translate.js";

export async function translateSections(sections, targetLang) {
  return Promise.all(
    sections.map(async (s) => ({
      heading: s.heading
        ? await translateText(s.heading, targetLang)
        : '',
      paragraphs: await Promise.all(
        (s.paragraphs || []).map(p =>
          p ? translateText(p, targetLang) : ''
        )
      )
    }))
  );
}
