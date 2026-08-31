<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class JobVacancy extends Model
{
    use HasFactory;

    protected $table = 'job_vacancies';

    protected $fillable = [
        'company_id',
        'position',
        'slug',
        'location',
        'type',
        'major',
        'salary_min',
        'salary_max',
        'description',
        'requirements',
        'skills',
        'apply_url',
        'deadline',
        'status',
        'source',
        'source_external_id',
        'published_at',
    ];

    protected $casts = [
        'requirements' => 'array',
        'skills' => 'array',
        'deadline' => 'date',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (JobVacancy $job) {
            if (empty($job->slug)) {
                $job->slug = Str::slug($job->position) . '-' . Str::random(6);
            }
        });
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
