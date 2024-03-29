<p align="center">
    <a href="https://www.awema.pl/?utm_source=github&utm_medium=indigo-layout" target="_blank" rel="noopener noreferrer">
        <img width="100" src="/assets/awema-pl/form-builder/promo/Logo_sign_color.svg" alt="Awema.pl logo">
    </a>
</p>

<h1 align="center">From Builder</h1>

<p align="center">A component that allows creating forms with two-way binding from data object with default HTML fields and custom, like multi-block or AJAX-select.</p>


<p align="center">
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://www.awema.pl/4GBWO/awema-pl/module-form-builder/version.svg" alt="Last version" >
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://www.awema.pl/4GBWO/awema-pl/module-form-builder/downloads.svg" alt="Downloads" >
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/license/awema-pl/module-form-builder.svg" alt="License" />
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://www.awema.pl/4GBWO/awema-pl/module-form-builder/status.svg" alt="CDN Ready" /> 
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields" target="_blank">
        <img src="/assets/awema-pl/form-builder/badges/vuejs.svg" alt="vue" />
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/last-commit/awema-pl/indigo-layout.svg" alt="Last commit" />
    </a>
    <a href="https://github.com/awema-pl/awema-pl">
        <img src="https://ga-beacon.appspot.com/UA-134431636-1/awema-pl/module-form-builder" alt="Analytics" />
    </a>
    <a href="https://www.awema.pl/?utm_source=github&amp;utm_medium=shields">
        <img src="https://www.awema.pl/badges/hosted.svg" alt="Hosted by Package Kit" />
    </a>
    <a href="https://www.patreon.com/join/awemadotio">
        <img src="/assets/awema-pl/form-builder/badges/patreon.svg" alt="Patreon" />
    </a>
</p>

##
<p align="center">
    <img src="/assets/awema-pl/form-builder/github/form-buider.gif" alt="form builder" />
</p>

## Demo
You can check it online: [Online Demo](https://demo.awema.pl/?utm_source=github&utm_medium=form-builder)

## Documentation

[Documentation](https://www.awema.pl/documentation/components/form-builder/)

## NPM scripts

Development mode `npm run watch` or simply `npm start`
Development mode for IE `npm run watch:legacy`
Production build `npm run build`

## Installation

Via Composer

``` bash
$ composer require awema-pl/module-form-builder
```

The package will automatically register itself.

You can publish the config file with:

```bash
php artisan vendor:publish --provider="AwemaPL\FormBuilder\Providers\FormBuilderServiceProvider" --tag="config"
```

## Support Us

<p align="center">
    <a href="https://www.patreon.com/netlinker" target="_blank">
        <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
    </a>
</p>

## License

[MIT](http://opensource.org/licenses/MIT)
