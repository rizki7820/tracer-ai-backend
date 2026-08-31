<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AlumniProfile extends Model
{
    protected $fillable = [

        'user_id',

        'nis',

        'full_name',

        'phone',

        'graduation_year',

        'major',

        'city',

        'province',

        'bio',

        'linkedin_url',

        'github_url',

        'portfolio_url',

        'avatar',

        'is_public'

    ];

    protected $casts = [

        'graduation_year' => 'integer',

        'is_public' => 'boolean',

    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
