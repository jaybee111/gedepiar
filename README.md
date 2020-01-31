# Gedepiar - Cookie-Banner based on GDPR Guidelines
A dependency-free Cookie-Banner for managing  cookies and external scripts of your website/webapp. Based on GDPR-Guidelines

## Table of contents

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Installation

### Installation via npm
Recommended step for projects with integrated module bundler (e.g. Webpack) or task-runner (e.g. Gulp).
1. ``npm install gedepiar --save``
2. Integrate it via the import statement ``import Gedepiar from 'gedepiar'``

### Installation via cloning repo
Recommended step for projects without a task-runner or module bundler.

1. Open your shell and clone the repo ``git clone .....``
2. Afterwards run ``npm run build``
3. Switch to the newly created directory ``dist`` and copy ``gedepiar.min.js`` and ``gedepiar.min.css`` to your projects assets folder. 
4. Add the CSS-File to the head-Tag: ``<link rel="stylesheet" href="/path/to/css/gedepiar.min.css">``
5. Add the JS-File to the bottom of the body-Tag: ``<script type="text/javascript" src="/path/to/js/gedepiar.min.js"></script>``

## Usage

Add ``lang`` - Attribute to html-Tag. Otherwise english or the defined fallback language is used as default language.

``<html lang="de">``

Add init-function to your JavaScript-File:
````
// yourCustom.js
Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt']
});
````

Add data-attributes to HTML-Tags. For further information go to [Services](#services).

### Options

| Attribute     | Type          | Default  | Description  |
| ------------- | ------------- | -------- | -------- |
| services      | array         | []       | Services to be managed by the cookie banner. Possibile options: Google Analytics ``ga``, Google Maps ``gmap``, PHP-Session Cookie ``phpsess``, Youtube ``yt``. Need other services? No Problem! Add your own service. Look at [Services](#own-services).
| i18n          | object        | {}       | Override default translation. Look at [Translation](#translation) for further information.
| fallbackLang  | string        | en       | If the translation is not available, the defined language is loaded

## Services

Every service has an unique alias. This alias is used to identify the related html-Tags ``data-gedepiar-service="[SERVICE-ALIAS]"``.
In addition the html elements must be marked as follows:

**External or local script**

````
<script data-gedepiar-service="[SERVICE-ALIAS]" type="text/plain" src="[SCRIPT-SRC]"></script>
````

**iframe and overlay**

````
<iframe data-gedepiar-service="[SERVICE-ALIAS]" data-gedepiar-overlay data-src="[IFRAME-SRC]"></iframe>
````

**div and overlay**

````
<div data-gedepiar-service="[SERVICE-ALIAS]" data-gedepiar-overlay>
    External service injects some html
</div>
````

___TODO show overlay image

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

Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt',twitterService]
});

<blockquote class="twitter-tweet" data-gedepiar-service="twitter" data-gedepiar-overlay>
    <p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>
    &mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a>
</blockquote>
<script data-gedepiar-service="twitter" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

````

##### Translation

If you added an individual service you have to adjust the initialization process by adding entries to the translation object.

````
Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt',twitterService],
    'i18n': {
        'de' : {
            'twitterHeadline': 'Twitter',
            'twitterOverlayHeadline': 'Twitter is deaktiviert',
            'twitterOverlayContent': 'Das ist eine Beschreibung zum Twitter-Plugin',
            'twitterOverlayBtnLabel': 'Aktivieren',
        },
        {
        'en' : {
            'twitterHeadline': 'Twitter',
            'twitterOverlayHeadline': 'Twitter',
            'twitterOverlayContent': 'A description about the Twitter-Plugin',
            'twitterOverlayBtnLabel': 'Activate',
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

#### Options

| Attribute     | Type          | Default  | Description  |
| ------------- | ------------- | -------- | -------- |
| alias         | string        |          | Your unique service alias
| category      | string        |          | Possibile options: `comfort`, `mandatory`, `analyze`

#### Events

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

Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt',twitterService]
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

Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt',twitterService]
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

Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt',twitterService]
}); 

````

## Translation

Would you like to overwrite a default translation entry? Add the i18n-Option to the init-Function.
Look at ``[PATH_TO_NODE_MODULES]/gedepiar/src/js/i18n/`` for all possibile entries. 

````
Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt'],
    'i18n': {
        'de' : {
            'ytHeadline': 'Lorem Ipsum',
        },
        {
        'en' : {
            'ytHeadline': 'Lorem Ipsum',
        }
    }
});
````

Do you need another link for your imprint and data privacy?

````
Gedepiar.init({
    'services' : ['phpsess','ga','gmap','yt'],
    'i18n': {
        'de' : {
              dataPrivacyTarget: '/datenschutz-test',
              dataPrivacyLabel: 'Datenschutz Test',
            
              imprintTarget: '/impressum-test',
              imprintLabel: 'Impressum Test',
        },
        {
        'en' : {
              dataPrivacyTarget: '/data-privacy-test',
              dataPrivacyLabel: 'Data privacy test',
            
              imprintTarget: '/imprint-test',
              imprintLabel: 'Imprint test',
        }
    }
});
````

# FAQ

# License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.
