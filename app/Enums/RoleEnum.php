<?php

namespace App\Enums;

enum RoleEnum: string
{
    case Admin = 'admin';
    case Company = 'company';
    case Alumni = 'alumni';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
