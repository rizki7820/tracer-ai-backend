<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'provider',
        'logo',
        'level',
        'field',
        'location',
        'funding_type',
        'description',
        'requirements',
        'benefits',
        'registration_url',
        'deadline',
        'status',
        'source',
        'source_external_id',
        'published_at',
    ];

    protected $casts = [
        'requirements' => 'array',
        'benefits' => 'array',
        'deadline' => 'date',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Scholarship $scholarship) {
            if (empty($scholarship->slug)) {
                $scholarship->slug = Str::slug($scholarship->title) . '-' . Str::random(6);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
