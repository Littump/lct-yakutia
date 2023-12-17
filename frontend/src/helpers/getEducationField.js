export default function getEducationField(value, reversed = false) {
  if (!reversed) {
    if (value == "gum") return "Гумманитарное";
    else if (value == "tech") return "Техническое";
    else if (value == "chem_bio") return "Химия, биология и производные";
    else if (value == "nat") return "Естественные науки";
    else if (value == "soc") return "Социальное, управленческое";
    else if (value == "eco") return "Экономическое";
  } else {
    if (value.toLowerCase() == "гумманитарное") return "gum";
    else if (value.toLowerCase() == "техническое") return "tech";
    else if (value.toLowerCase() == "Химия, биология и производные")
      return "chem_bio";
    else if (value.toLowerCase() == "Естественные науки") return "nat";
    else if (value.toLowerCase() == "Социальное, управленческое") return "soc";
    else if (value.toLowerCase() == "Экономическое") return "eco";
  }
}
