## Стримерская рулетка

Привет! Я [dize](https://www.twitch.tv/dize___), а это репозиторий с рулеткой для стримов.<br/>
Вы можете скачивать, использовать и изменять эту программу без любых ограничений.<br/>
Обо всех недоработках, неисправностях и предложениях можете написать 
в [группу telegram](https://t.me/stream_roulette)
или мне на [почту](mailto:zelenskyds@gmail.com).

* [Скачать готовую сборку](https://github.com/zelenskyds/steam-roulette/releases)
* [Инструкция по настройке и использованию](https://github.com/zelenskyds/stream-roulette/wiki)
* [Описание изменений версии](./CHANGELOG.md)
* [Планируется в следующих версиях](./ROADMAP.md)

## Как запустить
Скачайте одну из готовых сборок и распакуйте архив. 
Запустите файл `electron.exe` или `electron` в зависимости от ОС.

## Проблеммы и их решения
### Черный экран в OBS
* Добавьте в [файл настроек](https://github.com/zelenskyds/stream-roulette/wiki/%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B-%D0%B2%D1%80%D1%83%D1%87%D0%BD%D1%83%D1%8E): 
    
    ```
    {
        ...
        "system": {
          ...
          "disableHardwareAcceleration": true
        },
        ...
    }
    ```
    Если программа запущена, нужно её перезапустить.
* Попробуйте поставить совместимость с Windows 7