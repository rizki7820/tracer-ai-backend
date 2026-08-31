<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_vacancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->string('position');
            $table->string('slug')->unique();
            $table->string('location')->nullable();
            $table->string('type')->default('Full Time'); // Full Time, Part Time, Internship, Remote
            $table->string('major')->nullable(); // RPL, TKJ, Multimedia, dll
            $table->string('salary_min')->nullable();
            $table->string('salary_max')->nullable();
            $table->text('description')->nullable();
            $table->json('requirements')->nullable();
            $table->json('skills')->nullable();
            $table->string('apply_url')->nullable();
            $table->date('deadline')->nullable();
            $table->enum('status', ['draft', 'published', 'closed'])->default('published');
            $table->string('source')->default('manual'); // manual, remotive, arbeitnow, adzuna
            $table->string('source_external_id')->nullable()->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_vacancies');
    }
};
