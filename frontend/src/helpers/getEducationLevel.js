export default function getEducationLevel(value, reversed = false) {
  if (!reversed) {
    if (+value == 0) return "Без образования";
    else if (+value == 1) return "Среднее общее";
    else if (+value == 2) return "Среднее специальное";
    else if (+value == 3) return "Высшее";
  } else {
    if (value.toLowerCase() == "без образования") return 0;
    else if (value.toLowerCase() == "среднее общее") return 1;
    else if (value.toLowerCase() == "среднее специальное") return 2;
    else if (value.toLowerCase() == "высшее") return 3;
  }
}
