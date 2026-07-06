<?php

namespace App\Http\Requests\Auth;
use App\Enums\RoleEnum;
use Illuminate\Validation\Rules\Enum;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'=>'required|string|max:255',

            'email'=>'required|email|unique:users,email',

            'password'=>'required|min:8|confirmed',

            'role' => [
                'required',
                new Enum(RoleEnum::class),
            ],
        ];
    }
}
