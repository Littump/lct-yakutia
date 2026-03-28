# ЛЧТ «Якутия» — прогноз текучести и HR-аналитика

Решение для инженерно-программного конкурса (кейс с ML-моделью увольнений): **Django REST API**, загрузка сотрудников из **CSV**, расчёт вероятностей (модуль `layoff_model`), веб-клиент на **React**.

## Возможности

- Учёт подразделений и сотрудников, выгрузка в CSV
- Пересчёт показателей по данным HR
- Swagger UI: после запуска — `http://localhost/swagger/`

## Запуск (Docker Compose)

```bash
docker compose -f infra/docker-compose.yml up --build
# или локальная среда:
docker compose -f infra-local/docker-compose.yml up --build
```

В контейнере `backend`:

```bash
python manage.py collectstatic
python manage.py migrate
```

## Стек

- **Backend:** Django 4.2, DRF, PostgreSQL, pandas  
- **Frontend:** React (каталог `frontend/`)  
- **Инфраструктура:** Docker Compose (`infra/`, `infra-local/`)

## Репозиторий

[github.com/Littump/lct-yakutia](https://github.com/Littump/lct-yakutia)
