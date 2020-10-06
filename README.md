# Gedepiar
A dependency-free Cookie-Banner for managing your website/webapp cookies and external resources. Based on GDPR-Guidelines 

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Services](#services)
- [Translation](#translation)
- [Notes](#note)
- [License](#license)

## Installation

### Installation via npm
Recommended step for projects with integrated module bundler (e.g. Webpack) or task-runner (e.g. Gulp).
1. ``npm install gedepiar --save``
2. Integrate it via the import statement ``import Gedepiar from 'gedepiar'``
3. Import ``[PATH_TO_NODE_MODULES]/gedepiar/dist/gedepiar.min.css`` to your stylesheets / workflow

### Installation via cloning repo
Recommended step for projects without a task-runner or module bundler.

1. Open your shell and clone the repo ``git clone git@github.com:jaybee111/gedepiar.git``
2. Afterwards run ``npm run build``
3. Switch to the newly created directory ``dist`` and copy ``gedepiar.min.js`` and ``gedepiar.min.css`` to your projects assets folder. 
4. Add the CSS-File to your projects head-Tag: ``<link rel="stylesheet" href="/path/to/css/gedepiar.min.css">``
5. Add the JS-File to the bottom of your projects body-Tag: ``<script type="text/javascript" src="/path/to/js/gedepiar.min.js"></script>``

## Usage

1. Add ``lang`` - Attribute to html-Tag. Otherwise english or the defined fallback language is used as default language.
    ``<html lang="en">``

2. Add init-function to your JavaScript-File:
    ````
    // yourCustom.js
    gedepiar.init({
        services : ['phpsess','ga','gmap','yt']
    });
    ````
   **Options**

    | Attribute     | Type          | Default  | Description  |
    | ------------- | ------------- | -------- | -------- |
    | services      | array         | []       | Services to be managed by the cookie banner. Possible options: Google Analytics ``ga``, Google Maps ``gmap``, PHP-Session Cookie ``phpsess``, Youtube ``yt``. Need other services? No Problem! Add your own service. Look at [Services](#individual-service).
    | i18n          | object        | {}       | Override default translation. Look at [Translation](#translation) for further information.
    | fallbackLang  | string        | en       | If the translation is not available, the defined language is loaded
    | showModalBtn  | boolean       | true     | A Button will be shown in the left corner on every website to open the cookie settings modal.

3. Add data-attributes to HTML-Tags. For further information go to [Services](#services).

## Services

Every service has an unique alias (e.g. Google Analytics = ga). This alias is used to identify the related HTML-Tags ``data-gedepiar-service="[SERVICE-ALIAS]"``.

**data-attributes**

| Attribute     | Description  |
| ------------- | --------- |
| data-gedepiar-service     | This alias is used to identify the related HTML-Tags ``data-gedepiar-service="[SERVICE-ALIAS]"``
| data-gedepiar-overlay     | Adds a html-Wrapper which includes explanatory service text and an activation button. This wrapper will be present until the user clicked the activation button. After clicking the activation button the external resource will be loaded (e.g. [Youtube](#youtube))
| data-gedepiar-overlay-img | Adds a html-Wrapper which includes explanatory service text, an activation button and a background image. This wrapper will be present until the user clicked the activation button. After clicking the activation button the external resource will be loaded (e.g. [Youtube](#youtube))

The html elements must be marked as follows:

### Google Maps

````
<div id="map" class="gmap" data-gedepiar-service="gmap" data-gedepiar-overlay></div>

<script data-gedepiar-service="gmap" type="text/plain">
  const map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  initMap();
</script>

<script data-gedepiar-service="gmap" type="text/plain" src="https://maps.googleapis.com/maps/api/js?key=[YOUR-API-KEY]" async defer></script>
````

### Google Analytics / Tag Manager

````
<script data-gedepiar-service="ga" async src="https://www.googletagmanager.com/gtag/js?id=[YOUR-IDENTIFIER]" type="text/plain"></script>
<script data-gedepiar-service="ga" type="text/plain">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '[YOUR-IDENTIFIER]');
</script>
````

### Youtube
````
<iframe data-gedepiar-service="yt" data-gedepiar-overlay width="560" height="315" src="" data-src="https://www.youtube-nocookie.com/embed/O4Z0o1cxAsw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
````

### Individual service
Do you need other services? You can add an individual service (e. g. Twitter).

````
const twitterService = {
    alias : 'twitter',
    category: 'comfort',
};

gedepiar.init({
    services : ['phpsess','ga','gmap','yt',twitterService]
});

<blockquote class="twitter-tweet" data-gedepiar-service="twitter" data-gedepiar-overlay>
    <p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>
    &mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a>
</blockquote>
<script data-gedepiar-service="twitter" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

````

#### Options

| Attribute     | Type          | Default  | Description  |
| ------------- | ------------- | -------- | -------- |
| alias         | string        |          | Your unique service alias
| category      | string        |          | Possibile options: `comfort`, `mandatory`, `analyze`

**Don't** forget to add translations for your individual service. Look at [translation section](#service-translation).

#### Events

Do you need additional behavior? You can hook into the processes of the lib with events:

**onInit(elements,settings)**

Executed once on page load

````
const twitterService = {
    alias : 'twitter',
    category: 'comfort',
    onInit: function(elements,settings){
        console.log('Execute onInit');
    },
};

gedepiar.init({
    services : ['phpsess','ga','gmap','yt',twitterService]
}); 

````

**onActivate(elements,settings)**

Executed on activation of service

````
const twitterService = {
    alias : 'twitter',
    category: 'comfort',
    onActivate: function(elements,settings){
        console.log('Execute onActivate');
    },
};

gedepiar.init({
    services : ['phpsess','ga','gmap','yt',twitterService]
}); 

````

**onDisable(elements,settings)**

Executed on deactivation of service

````
const twitterService = {
    alias : 'twitter',
    category: 'comfort',
    onDisable: function(elements,settings){
        console.log('Execute onDisable');
    },
};

gedepiar.init({
    services : ['phpsess','ga','gmap','yt',twitterService]
}); 

````

### Translation

Would you like to overwrite a default translation entry? Add the i18n-Option to the init-Function.
Look at ``[PATH_TO_NODE_MODULES]/gedepiar/src/js/i18n/`` for all possible entries. 

````
gedepiar.init({
    services : ['phpsess','ga','gmap','yt'],
    i18n: {
        de : {
            ytHeadline: 'Lorem Ipsum',
        },
        {
        en : {
            ytHeadline: 'Lorem Ipsum',
        }
    }
});
````

Do you need another link for your imprint and data privacy?

````
gedepiar.init({
    services : ['phpsess','ga','gmap','yt'],
    i18n: {
        de : {
              dataPrivacyTarget: '/datenschutz-test',
              dataPrivacyLabel: 'Datenschutz Test',
            
              imprintTarget: '/impressum-test',
              imprintLabel: 'Impressum Test',
        },
        {
        en : {
              dataPrivacyTarget: '/data-privacy-test',
              dataPrivacyLabel: 'Data privacy test',
            
              imprintTarget: '/imprint-test',
              imprintLabel: 'Imprint test',
        }
    }
});
````

#### Service translation

By adding an individual service you have to adjust the initialization process by adding entries to the translation object.

````
gedepiar.init({
    services : ['phpsess','ga','gmap','yt',twitterService],
    i18n: {
        de : {
            twitterHeadline: 'Twitter',
            twitterOverlayHeadline: 'Twitter is deaktiviert',
            twitterOverlayContent: 'Das ist eine Beschreibung zum Twitter-Plugin',
            twitterOverlayBtnLabel: 'Aktivieren',
        },
        {
        en : {
            twitterHeadline: 'Twitter',
            twitterOverlayHeadline: 'Twitter',
            twitterOverlayContent: 'A description about the Twitter-Plugin',
            twitterOverlayBtnLabel: 'Activate',
        }
    }
});
````

Every individual need following translation keys:

- ``[INDIVIDUAL-SERVICE-ALIAS]Headline``
- ``[INDIVIDUAL-SERVICE-ALIAS]OverlayHeadline`` (optional, is only needed if overlay is present)
- ``[INDIVIDUAL-SERVICE-ALIAS]OverlayContent`` (optional, is only needed if overlay is present)
- ``[INDIVIDUAL-SERVICE-ALIAS]OverlayBtnLabel``(optional, is only needed if overlay is present)

The custom translation entries are merged with the default translation entries.

## Notes

The tool does **not** claim legal certainty. Please contact a lawyer for a legally compliant check of your web application.

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.
