<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->foreignId('user_id')->after('id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('job_vacancy_id')->after('user_id')->constrained('job_vacancies')->cascadeOnDelete();
            $table->foreignId('resume_id')->nullable()->after('job_vacancy_id')->constrained('resumes')->nullOnDelete();
            $table->text('cover_letter')->nullable();
            $table->enum('status', ['submitted', 'reviewed', 'interview', 'accepted', 'rejected'])->default('submitted');
            $table->unique(['user_id', 'job_vacancy_id']);
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'job_vacancy_id']);
            $table->dropConstrainedForeignId('resume_id');
            $table->dropConstrainedForeignId('job_vacancy_id');
            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn(['cover_letter', 'status']);
        });
    }
};
