<?php

namespace AwemaPL\FormBuilder;

use AwemaPL\BaseJS\AwemaProvider;
use Illuminate\Support\Collection;

class FormBuilderServiceProvider extends AwemaProvider
{

    public function boot()
    {
        parent::boot();

        Collection::macro('fbSelect', function ($name = 'name', $value = 'id') {
            return $this->map(function ($item) use ($name, $value) {
                return [
                    'name' => $item[$name],
                    'value' => $item[$value]
                ];
            });
        });
    }

    public function getPackageName(): string
    {
        return 'form-builder';
    }

    public function getPath(): string
    {
        return __DIR__;
    }
}
