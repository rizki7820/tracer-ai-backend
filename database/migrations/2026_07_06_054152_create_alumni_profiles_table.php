<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alumni_profiles', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('nis')->nullable();

            $table->string('full_name');

            $table->string('phone')->nullable();

            $table->year('graduation_year')->nullable();

            $table->string('major')->nullable();

            $table->string('city')->nullable();

            $table->string('province')->nullable();

            $table->text('bio')->nullable();

            $table->string('linkedin_url')->nullable();

            $table->string('github_url')->nullable();

            $table->string('portfolio_url')->nullable();

            $table->string('avatar')->nullable();

            $table->boolean('is_public')->default(true);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni_profiles');
    }
};
