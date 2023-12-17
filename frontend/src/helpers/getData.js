export default function getData(workers, activeFilter) {
  let data = [];
  if (activeFilter.toLowerCase() == "возраст") {
    data = [
      {
        x: "до 30",
        y: 0,
      },
      {
        x: "40",
        y: 0,
      },
      {
        x: "50",
        y: 0,
      },
      {
        x: "80",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.age <= 30) data[0].y++;
      if (+worker?.age > 30 && +worker?.age <= 40) data[1].y++;
      if (+worker?.age > 40 && +worker?.age <= 50) data[2].y++;
      if (+worker?.age > 50 && +worker?.age <= 80) data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "пол") {
    data = [
      {
        x: "мужчины",
        y: 0,
      },
      {
        x: "женщины",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.is_male == 1) data[0].y++;
      else data[1].y++;
    });
  }
  if (activeFilter.toLowerCase() == "всего лет работы") {
    data = [
      {
        x: "до 5",
        y: 0,
      },
      {
        x: "10",
        y: 0,
      },
      {
        x: "20",
        y: 0,
      },
      {
        x: "более 20",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.total_working_years <= 5) data[0].y++;
      else if (+worker?.total_working_years <= 10) data[1].y++;
      else if (+worker?.total_working_years <= 20) data[2].y++;
      else data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "в браке") {
    data = [
      {
        x: "да",
        y: 0,
      },
      {
        x: "нет",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.is_married == "1") data[0].y++;
      else data[1].y++;
    });
  }
  if (activeFilter.toLowerCase() == "прогноз") {
    data = [
      {
        x: "до 30%",
        y: 0,
      },
      {
        x: "50%",
        y: 0,
      },
      {
        x: "70%",
        y: 0,
      },
      {
        x: "более 80%",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.probability <= 30) data[0].y++;
      else if (+worker?.probability <= 50) data[1].y++;
      else if (+worker?.probability <= 70) data[2].y++;
      else data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "часов работы в неделю") {
    data = [
      {
        x: "до 20",
        y: 0,
      },
      {
        x: "30",
        y: 0,
      },
      {
        x: "40",
        y: 0,
      },
      {
        x: "более 40",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.work_hours_week <= 20) data[0].y++;
      else if (+worker?.work_hours_week <= 30) data[1].y++;
      else if (+worker?.work_hours_week <= 40) data[2].y++;
      else data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "лет работы в компании") {
    data = [
      {
        x: "до 2",
        y: 0,
      },
      {
        x: "5",
        y: 0,
      },
      {
        x: "10",
        y: 0,
      },
      {
        x: "более 10",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.years_at_company <= 2) data[0].y++;
      else if (+worker?.years_at_company <= 5) data[1].y++;
      else if (+worker?.years_at_company <= 10) data[2].y++;
      else data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "заработная плата") {
    data = [
      {
        x: "до 40к",
        y: 0,
      },
      {
        x: "60к",
        y: 0,
      },
      {
        x: "80к",
        y: 0,
      },
      {
        x: "100к",
        y: 0,
      },
      {
        x: "более 100к",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.salary <= 40000) data[0].y++;
      else if (+worker?.salary <= 60000) data[1].y++;
      else if (+worker?.salary <= 80000) data[2].y++;
      else if (+worker?.salary <= 100000) data[2].y++;
      else data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "уровень образования") {
    data = [
      {
        x: "Без образования",
        y: 0,
      },
      {
        x: "Среднее общее",
        y: 0,
      },
      {
        x: "Среднее специальное",
        y: 0,
      },
      {
        x: "Высшее",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (+worker?.education_level == 0) data[0].y++;
      else if (+worker?.education_level == 1) data[1].y++;
      else if (+worker?.education_level == 2) data[2].y++;
      else if (+worker?.education_level == 3) data[3].y++;
    });
  }
  if (activeFilter.toLowerCase() == "область образования") {
    data = [
      {
        x: "Гумманитарное",
        y: 0,
      },
      {
        x: "Техническое",
        y: 0,
      },
      {
        x: "Хим-био",
        y: 0,
      },
      {
        x: "Естественные науки",
        y: 0,
      },
      {
        x: "Соц-управленческое",
        y: 0,
      },
      {
        x: "Экономическое",
        y: 0,
      },
    ];
    workers?.forEach((worker) => {
      if (worker?.education_field == "gum") data[0].y++;
      else if (worker?.education_field == "tech") data[1].y++;
      else if (worker?.education_field == "chem_bio") data[1].y++;
      else if (worker?.education_field == "nat") data[1].y++;
      else if (worker?.education_field == "soc") data[1].y++;
      else if (worker?.education_field == "eco") data[1].y++;
    });
  }
  return data;
}
