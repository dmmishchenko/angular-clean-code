# angular-clean-code
### Пример реализации виджетов в виде самостоятельных блоков.
внутри каждого виджета есть свои usecases, services и components
- виджет может взаимодействовать с другими виджетами или через общие сервисы уровня приложения или через фасады виджетов

Остальное осталось примерно таким же:
- ui работает через usecases(application слой)
- usecases могут обращаться к репозиториям и сервисам (data слой)
- слой может использовать только слои находящиеся ниже/глубже
- в целом чем выше слой - тем более общий уровень

### из минусов:
- после разбиения на виджеты application слой кажется неверно расположенным или названным

