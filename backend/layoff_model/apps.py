from django.apps import AppConfig

from layoff_model.helper import Helper


class LayoffModelConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'layoff_model'

    def ready(self):
        Helper()
