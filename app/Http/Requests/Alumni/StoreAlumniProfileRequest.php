<?php

namespace App\Http\Requests\Alumni;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAlumniProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'full_name' => [
                'required',
                'string',
                'max:255'
            ],

            'nis' => [
                'nullable',
                'string',
                'max:30'
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20'
            ],

            'graduation_year' => [
                'nullable',
                'digits:4',
                'integer'
            ],

            'major' => [
                'nullable',
                'string',
                'max:100'
            ],

            'city' => [
                'nullable',
                'string',
                'max:100'
            ],

            'province' => [
                'nullable',
                'string',
                'max:100'
            ],

            'bio' => [
                'nullable',
                'string'
            ],

            'linkedin_url' => [
                'nullable',
                'url'
            ],

            'github_url' => [
                'nullable',
                'url'
            ],

            'portfolio_url' => [
                'nullable',
                'url'
            ],

            'is_public' => [
                'nullable',
                'boolean'
            ]

        ];
    }

    public function messages(): array
    {
        return [

            'full_name.required' => 'Nama lengkap wajib diisi.',

            'graduation_year.digits' => 'Tahun lulus harus 4 digit.',

            'linkedin_url.url' => 'URL LinkedIn tidak valid.',

            'github_url.url' => 'URL GitHub tidak valid.',

            'portfolio_url.url' => 'URL Portfolio tidak valid.',

        ];
    }
}
